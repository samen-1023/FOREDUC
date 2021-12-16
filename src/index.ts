import {ConnectionOptions, createConnection} from "typeorm";
import Koa from 'koa';
import json from 'koa-bodyparser';
import AuthRoute from './routes/Auth.route';
import logger from 'koa-logger'
require('dotenv').config()

const {DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, NODE_PORT} = process.env
// define config db
const config: ConnectionOptions = {
    type: "postgres",
    host: DB_HOST,
    port: +DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    synchronize: true,
    entities: [
        "src/entity/**/*.ts"
    ]
}

const app: Koa = new Koa()

// middlewares
app.use(json());
app.use(logger());

//routes
app.use(AuthRoute.routes())
    .use(AuthRoute.allowedMethods())

//create connection db and server
createConnection(config).then(() => {
    app.listen(NODE_PORT, () => {
        console.log(`Your server available at http://localhost:${NODE_PORT}`)
    })
}).catch(err => console.log(err))
