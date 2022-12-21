//PROFILING
//Explicacion de lo que es un Profiling nos ayuda a registrar la informacion de analisis de rendimiento 
// Con el objetivo de dedicvar el tiempo dedicado a la ejecución del programa brindando informacion legible, tambien nos ayuda a detectar los cuellos de botella 

//CURL
//Es una herramienta que nos ayudará a mostrar estos profiling, de linea de comandos y lirberia para transferir datos con URL semejante a POSTMAN solo que se ejecuta por linea de comando 

const express = require("express");
const crypto = require("crypto");
//Usamos el modulo crypro encriptar contraseñas, y hay dos rutas de autenticación

const app = express();

const users = {}

app.use(express.static('public'))

const PORT = parseInt(process.argv[2]) || 8080

app.get("/getUsers", (req, res) => {
    res.json({ users })
  })

app.get("/newUser", (req, res) => {
    let username = req.query.username || "";
    const password = req.query.password || "";

    username = username.replace(/[!@#$%^&*]/g, "");

    if (!username || !password || users[username]) {
        return res.sendStatus(400);
    }

    const salt = crypto.randomBytes(128).toString("base64");
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512");

    users[username] = { salt, hash };

    res.sendStatus(200);
})

app.get("/auth-bloq", (req, res) => {
    let username = req.query.username || "";
    const password = req.query.password || "";
  
    username = username.replace(/[!@#$%^&*]/g, "");
  
    if (!username || !password || !users[username]) {
      process.exit(1)
      // return res.sendStatus(400);
    }
  
    const { salt, hash } = users[username];
    const encryptHash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512");
  
    if (crypto.timingSafeEqual(hash, encryptHash)) {
      res.sendStatus(200);
    } else {
      process.exit(1)
      // res.sendStatus(401);
    }
})

app.get("/auth-nobloq", (req, res) => {
    let username = req.query.username || "";
    const password = req.query.password || "";
    username = username.replace(/[!@#$%^&*]/g, "");
  
    if (!username || !password || !users[username]) {
      process.exit(1)
      // return res.sendStatus(400);
    }
    crypto.pbkdf2(password, users[username].salt, 10000, 512, 'sha512', (err, hash) => {
      if (users[username].hash.toString() === hash.toString()) {
        res.sendStatus(200);
      } else {
        process.exit(1)
        //res.sendStatus(401);
      }
    });
});
  
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
server.on("error", (error) => console.log(`Error en servidor: ${error}`));



// comandos para ejecutar
// node --prof profiling.js

// curl -X GET "http://localhost:8080/newUser?username=marian&password=qwerty123"
// artillery quick --count 10 -n 50 "http://localhost:8080/auth-bloq?username=marian&password=qwerty123" > result_bloq.txt
//Hacerlo en la consola de git bash

// curl -X GET "http://localhost:8080/newUser?username=dani&password=dani123"
// artillery quick --count 10 -n 50 "http://localhost:8080/auth-nobloq?username=dani&password=dani123" > result_nobloq.txt
//Hacerlo en la consola de git bash

// decodificar archivos log
// node --prof-process bloq-v8.log > result_prof_bloq.txt
// node --prof-process nobloq-v8.log > result_prof_nobloq.txt
//Hacerlo en el powershell


// node --inspect profiling.js
//chrome://inspect



// El generador de perfiles se basa en el muestreo. Es decir, se despierta a
// intervalos regulares (ticks) y registra dónde está el puntero de instrucción. Si la
// IP apunta a una dirección que no se puede resolver en una función, la
// marca se informa como no contabilizada.

//Codigo de ejecucion para la prueba con autocannon
// npm start 
// curl -X GET "http://localhost:8080/newUser?username=dani&password=qwerty123"
// npm test
//UNA VEZ QUE TERMINE LA EJECUCION DE DEBEMOS PARA EL SERVIDOR  y de ahi se creará una nueva carpeta con el grafico flama de html donde nos mostrar la duracion de los procesos del archivos que ejecutamos