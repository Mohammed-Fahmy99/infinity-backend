"use strict";
// import { createServer } from "http";
Object.defineProperty(exports, "__esModule", { value: true });
// const routes: any = [];
// function addNewRoute(route: string, callback: () => void): void {
//     let regEx = "/";
//     const routeChunks = route.split('/').filter(item => item !== '')    // /users/{user_id} => ['users', '{user_id}'] => /\/users\/w+/
//     for (const chunk of routeChunks) {
//         regEx += '\/'
//         if (chunk.startsWith('{') && chunk.endsWith('}')) regEx += "{w+}"
//         else regEx += chunk
//     }
//     regEx += '/'
//     routes.push([new RegExp(regEx), callback])
// }
// addNewRoute('/home', () => { console.log('home') })
// addNewRoute('/about', () => { console.log('about') })
// addNewRoute('/users/{id://}', () => { console.log('users') })
// const handleRequest = (req: any, res: any) => {
//     for (const route of routes) {
//         if(route[0].test(req.url)) return route[1](req, res);
//     }
// }
// const server = createServer(handleRequest);
// const port = 1234;
// server.listen(port, () => { console.log(`Server started on http://localhost:${port}`) })
// ------------------------------------------------------------------------------------------
var http_1 = require("http");
var routes = [];
var addNewRouter = function (reqUrl, callback) {
    var routeRegex = "/";
    var routeChunks = reqUrl.split('/').filter(function (item) { return item !== ''; });
    for (var _i = 0, routeChunks_1 = routeChunks; _i < routeChunks_1.length; _i++) {
        var chunck = routeChunks_1[_i];
        if ((new RegExp("{\w+}")).test(chunck)) {
            routeRegex += "{\w+}";
        }
        else {
            routeRegex += "\w+";
        }
        (chunck !== routeChunks[routeChunks.length - 1]) && (routeRegex += "/");
        // routeRegex+="/"
    }
    console.log(routeRegex);
    routes.push([
        routeRegex,
        callback
    ]);
};
addNewRouter('/moo', function (res) { return res.end("moo"); });
addNewRouter('/omar', function (res) { return res.end("omar"); });
addNewRouter('/user/{id}', function (res) { return res.end("user id"); });
var handleRequest = function (req, res) {
    for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
        var route = routes_1[_i];
        if ((new RegExp(route[0])).test(req.url))
            return route[1](res);
    }
    res.end('your route is wrong');
};
var server = (0, http_1.createServer)(handleRequest);
var port = 4444;
server.listen(port, function () { return console.log("your are live in http://localhost:".concat(port)); });
