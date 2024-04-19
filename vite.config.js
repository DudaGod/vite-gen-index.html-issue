import url from "node:url";
import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        port: 4444,
    },
    plugins: [
        {
            name: "generateIndexHtml",
            enforce: "pre",
            configureServer(server) {
                return () => {
                    server.middlewares.use(async (req, res, next) => {
                        if (!req.url?.endsWith("index.html") || !req.originalUrl) {
                            return next();
                        }

                        const urlParsed = url.parse(req.originalUrl);
                        const urlParamString = new URLSearchParams(urlParsed.query || "");
                        const uuid = urlParamString.get("uuid");

                        try {
                            if (!uuid) {
                                throw new Error(
                                    `Query parameter "uuid" must be specified in url: ${req.originalUrl}`,
                                );
                            }

                            const result = await server.transformIndexHtml(req.originalUrl, generateTemplate(uuid));
                            console.log('result:', result);

                            res.end(result);
                        } catch (err) {
                            res.end(await server.transformIndexHtml(`${req.originalUrl}`, generateErrorTemplate(err)));
                        }

                        return next();
                    })
                }
            }
        },
    ],

})

function generateTemplate(uuid) {
    return `
<!DOCTYPE html>
<html>
    <head>
        <title>Generated uuid: ${uuid}</title>
        <script type="module">
            console.log("${uuid}");
        </script>
    </head>
    <body></body>
</html>
`;
}

function generateErrorTemplate(error) {
    return `
<!DOCTYPE html>
<html>
    <body>
        <pre>${error}</pre>
    </body>
</html>
`;
}
