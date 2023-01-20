require("dotenv").config();
import express from "express";
import * as bodyParser from "body-parser";
import { AppCreator } from "./interfaces/AppCreator";

export class App implements AppCreator {
  private static instance: App;
  private app: express.Express;

  constructor() {
    this.app = express();
  }

  async initializeServer() {
    try{
        await this.loadMiddlewares()
        this.loadEndpoints()
        this.start()
    } catch(e){
        console.log(e)
    }
  }

  static getInstance() {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  }

  private async loadMiddlewares() {
    // parse application/json
    this.app.use(bodyParser.json({ limit: "50mb" }));
    // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));

    this.app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin,User-Agent, X-Requested-With, content-type,Content-Type, authtoken, access_token, access-token, Accept, authorization"
      );
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, GET, DELETE, OPTIONS"
      );
      console.log(`${req.method} ${req.originalUrl} on ${new Date()}`)

      if ("OPTIONS" === req.method) {
        res.send(200);
      } else {
        next();
      }
    });
  }

  private loadEndpoints(){
    this.app.get('/', (req, res) => {
        res.json({"result" : "Hello World!"})
    })
  }

  private start() {
    this.app.listen(process.env.PORT, () => {
      console.log(`Server running on ${process.env.PORT}`);
    });
  }
}