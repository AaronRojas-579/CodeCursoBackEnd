// Proxy / NGINX Clase 30
// Servidor P  tiene una comunicación con un VPN Sin ella la coneccion es directa, si utiliza para navegar por internet de forma anonima ya que oculpa ls direcciones IP de las origen 



//Servidor intermediario entre el cliente y los servidores de consulta para ocultar las direcciones IP, con la IP el servidor sabe la localidad
// Clientes --> Proxy --> Internet --> Servidores (Proxy directo)


//Pero tambien existen proxys del lado del Servidor, mantiene el anonimato del lado del Servidor, sirve tambien para distribuir la carga 
//Cuando tengamos mucho clientes o esta sobrecargado, este trafico es recibido por el proxy, y este puede distribuir la carga o el trafico entre otro servidores.
//Acelerar la web alojando en cache la aplicacion y facilita supervición
// Clientes --> Internet -- Proxy --> Servidor (Proxy Inverso)

//El puerto po defecto es el 80
//Para la instalacion de Nginx se debe utilizar BREW para dispositivos MAC 

//-------------config
// events {
// }

// http {
//     include       mime.types;
//     default_type  application/octet-stream;
    
//     upstream node_app {
//         server 127.0.0.1:8081;
//         server 127.0.0.1:8082 weight=3;
//     }
    
//     # upstream node_cluster {
//     #     server 127.0.0.1:8081;
//     # }
        
//     # upstream nginx_cluster {
//     #     server 127.0.0.1:8082;
//     #     server 127.0.0.1:8083;
//     #     server 127.0.0.1:8084;
//     #     server 127.0.0.1:8085;
//     # }

//     server {
//         listen 80;
//         server_name nginx_node;
//         root C:\Users\PC-FEDE\Documents\Coderhouse\comisiones\Backend\comisiones-activas\backend-32125-myj-m\clases\modulo2\clase30-nginx\proyecto-base\public;

//         location /datos/ {
//             proxy_pass http://node_app;
//         }
        
//         # location /randoms {
//         #     proxy_pass http://node_cluster;
//         # }
//     }
// }


//En la carpeta publica se debe copiar la ruta de acceso para poder usar los servidores Proxy 


//Luego de utilizar el Proxy ya no será necesario que utilicemos el app.use(express.static()) ya que dentro de las configuraciones se puede redirigir al archivo por defecto a la que irá.


//Estas son las dos maneras de levantar los Servidores (Desafio)
//pm2 start app.js --name "" (Fork)
//pm2 start app.js --name "Server 2" --watch -i --max  (Cluste)--> Este es para que no se nos sature, aqui las podemos distribuir para los varios clientes 
