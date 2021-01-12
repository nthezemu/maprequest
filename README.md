# maprequest2

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)
Run the command cd to ~destination to the downloaded mapquest folder and then run
run npm i to install modules
Update the database details in src/datasources/mysql-ds.datasource.ts. change the config object replace the mysql username with the necessary username and the necessary password as guided by the username and password that you had put during the installation of mysql or the username and password that you set up.
const config = {
    name: "mysqlDs",
    connector: "mysql",
    host: "localhost",
    port: 3306,
    database: "maprequest",
    username: "mysql username",
    password: "password",
    };
Run npm run build
Run npm run migrate
Install pm2 by running npm install pm2 -g
Run the backend by running the command pm2 start index.js 
You should be able to connect the front end of the maprequest to this backend. Alternatively you should be able to access the backend itself on http(s)://[ip or domani name to your server]:3000/exploler
