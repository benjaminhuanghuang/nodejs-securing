import express, { Router } from "express";
import bodyParser from "body-parser";
import webpack from "webpack";
import webpackConfig from "../webpack.config.dev";
import expressValidator from 'express-validator';


const port = 7000;
const app = express();
const compiler = webpack(webpackConfig);

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());
app.use(bodyParser.json());
app.use('/fonts', express.static(path.join(__dirname, './shard/assets/fonts')));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT, GET, POST, DELETE, OPTIONS');
  //res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  //res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(favicon("./shared/assets/images/favicon.ico"));
express.static.mime.define({"text/css":["css"]});
express.static.mime.define({"application/x-font-woff":["woff"]});
express.static.mime.define({"application/x-font-ttf":["ttf"]});

app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true,
  publicPath:webpackConfig.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler));
