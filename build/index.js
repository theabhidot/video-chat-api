"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("./src");
src_1.App.getInstance().initializeServer().then(function () {
    console.log('Application started');
});
