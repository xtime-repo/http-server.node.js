import { createServer, IncomingMessage, ServerResponse } from "http";
import { GetMimeType } from "./lib/mimetype";
import { UrlDecode, UrlPath } from "./lib/url-standard";
import { readFile } from "fs";

createServer(function (req: IncomingMessage, res: ServerResponse) {

    var url: string = UrlPath(UrlDecode(req.url as string));

    // Customize Url Proccesing
    if (url.endsWith("/")) url += "index.html";
 
    
    var mime = GetMimeType(url);
 
    readFile(url, function (err: NodeJS.ErrnoException, data: Buffer) {
    
        //Error Parsing
        if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.write(err + "\n");
            res.end();
            return;

        }

        //File Parsing
        //  res.setHeader('Cache-Control', 'max-age=3600');
        res.writeHead(200, { 'Content-Type': mime });
        res.end(data);
        return;

    });


}).listen(process.env.PORT || 8101);
