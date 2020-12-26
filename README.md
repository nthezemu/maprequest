# maprequest2

[![LoopBack](<https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png>)](http://loopback.io/)

## Installation

1. ### Install Scripts

   run `npm i` to install modules

2. ### Migrate DB

   1. Update the database details in src/datasources/mysql-ds.datasource.ts.
      change the config object

   ```
   const config = {
       name: "mysqlDs",
       connector: "mysql",
       host: "localhost",
       port: 3306,
       database: "maprequest",
       username: "root",
       password: "password",
       };
   ```

   2. Run `npm run build`
   3. Run `npm run migrate`

### Start Application

Run `npm run start`
