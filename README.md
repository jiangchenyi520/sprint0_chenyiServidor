"# sprint0_chenyiServidor" 
Este proyecto consiste en la comunicacion del nodo sensor mediante beacon BLE con el smartphone, comunicacion del smartphone con el servidor y base de datos con el servidor. Por ello se divide este proyecto en 3 repositorios diferentes: 
1. Arduino implementado para SparkFun Pro nRF528840 (Arduino) https://github.com/jiangchenyi520/Sprint-0_Web 
2. App (Android Studio) https://github.com/jiangchenyi520/Sprint0_chenyiApp
3. Servidor REST https://github.com/jiangchenyi520/Sprint-0_Web  

--------------------------------------------------------------------------------------------------------------------------------------------
Para clonar el repositorio: 
--------------------------------------------------------------------------------------------------------------------------------------------

En GitHub.com, vaya a la página principal del repositorio. 
1. Encima de la lista de archivos, haga clic en Código.

![195734363-3e8c083f-8d94-4197-85da-c2bc929f528e](https://user-images.githubusercontent.com/73239280/195735557-8d59c5c9-591a-4221-9b66-f377675b20b2.png)

2. Copia la dirección URL del repositorio. 
- Para clonar el repositorio con HTTPS, en «HTTPS» haz clic en (simbolo de pegar).
- Para clonar el repositorio mediante una clave SSH, incluido un certificado emitido por la entidad de certificación SSH de la organización, haga clic en Usar SSH y  luego en  (simbolo de pegar) .
- Para clonar un repositorio mediante GitHub CLI, haz clic en GitHub CLI y, después, haz clic en  (simbolo de pegar).

3. Abra Git Bash. 
4. Cambia el directorio de trabajo actual a la ubicación en donde quieres clonar el directorio. 
5. Escriba git clone y pegue la dirección URL que ha copiado antes.
6. Presione **Entrar** para crear el clon local.

En caso de tener dudas acceda a https://docs.github.com/es/repositories/creating-and-managing-repositories/cloning-a-repository

--------------------------------------------------------------------------------------------------------------------------------------------
  SERVIDOR
--------------------------------------------------------------------------------------------------------------------------------------------

1- Abrir la terminal y acceder la ruta del servidor (\----\servidorREST), una vez que se ha accedido a este, se introduce --> npm run servidor para arrancar el servidor

![image](https://user-images.githubusercontent.com/73239280/195817293-25c1856f-bfc6-49cd-b720-0aaaa6264002.png)

Para cerrar el servidor--> CTRL + C y responder en la terminal con S para cerrar

![image](https://user-images.githubusercontent.com/73239280/195817679-2f52a086-56af-49cd-bf15-b85eb1874636.png)


2- Abriendo la aplicación DB browser (sqlite) y darle a abrir el archivo de datoss.bd, Allí podremos ver todos los datos que se suben. 

![image](https://user-images.githubusercontent.com/73239280/195818964-27c3e757-1e07-4fb3-8e15-6dd0ea556308.png)
