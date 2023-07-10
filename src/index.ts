import { createServer } from "http";

var routes: any = []

const addNewRouter = (reqUrl: String, callback: (res: any) => void) => {
    reqUrl = reqUrl.split('/').filter(item => item !== '').join('/')

    let routeRegex: string = ""
    let routeChunks: string[] = reqUrl.split('/').filter(item => item !== '')
    for (let chunck of routeChunks) {
        if ((new RegExp(/{\w+}/)).test(chunck)) {
            routeRegex += "([a-zA-Z0-9_-\\W])+"
        } else {
            routeRegex += chunck
        }

        if (chunck !== routeChunks[routeChunks.length - 1]) {
            routeRegex += "\/"
        }
    }

    console.log(routeRegex);

    routes.push([
        routeRegex,
        callback
    ])
}

addNewRouter('/moo', (res) => res.end("moo"))
addNewRouter('/omar', (res) => res.end("omar"))
addNewRouter('/user/{id}/again', (res) => res.end("user id"))

const handleRequest = (req: any, res: any) => {
    for (const route of routes) {
        if ((new RegExp(route[0])).test(req.url)) return route[1](res);
    }
    res.end('your route is wrong')
}

const server = createServer(handleRequest)

const port = 4444
server.listen(port, () => console.log(`your are live in http://localhost:${port}`)
)



