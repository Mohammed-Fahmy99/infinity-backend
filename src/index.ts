// import { createServer } from "http";

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

import { createServer } from "http";

var routes: any = []

const addNewRouter = (reqUrl: String, callback: (res:any) => void) => {
    let routeRegex:string = "/"
    let routeChunks:string[] = reqUrl.split('/').filter(item => item !== '')
    for(let chunck of routeChunks){
        if((new RegExp("{\w+}")).test(chunck)) {
            routeRegex+= "{\w+}"
        }else{
            routeRegex+= "\w+"
        }
        (chunck !== routeChunks[routeChunks.length - 1]) && (routeRegex+="/")
        // routeRegex+="/"
    }
    console.log(routeRegex);
    
    routes.push([
        routeRegex,
        callback
    ]
    )
}

addNewRouter('/moo', (res) => res.end("moo"))
addNewRouter('/omar', (res) => res.end("omar"))
addNewRouter('/user/{id}', (res) => res.end("user id"))

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



