import { createServer } from "vite";
import open from "open";

(async () => {
    const server = await createServer("./vite.config.js");
    await server.listen();

    open('http://localhost:4444/?uuid=12345');
    open('http://localhost:4444/?uuid=67890');
})()
