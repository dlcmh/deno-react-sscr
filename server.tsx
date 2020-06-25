import { Application, Context, React, ReactDOMServer, Router } from "./deps.ts";

import App from "./app.tsx";

const PORT = 8008;

const app = new Application();
const jsBundle = "/main.js";

const js = `import React from "https://jspm.dev/react@16.13.1";
 import ReactDOM from "https://jspm.dev/react-dom@16.13.1";
 const App = ${App};
 ReactDOM.hydrate(React.createElement(App), document.getElementById('app'));`;

const html = `<html>
    <head>
      <link rel="stylesheet" href="https://unpkg.com/purecss@2.0.3/build/pure-min.css">
      <script type="module" src="${jsBundle}"></script>
    </head>
    <body>
      <main id="app">${ReactDOMServer.renderToString(<App />)}</main>
    </body>
  </html>`;

const router = new Router();
router
  .get("/", (context: Context) => {
    context.response.type = "text/html";
    context.response.body = html;
  })
  .get(jsBundle, (context: Context) => {
    context.response.type = "application/javascript";
    context.response.body = js;
  });

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port ${PORT}...`);

await app.listen({ port: PORT });
