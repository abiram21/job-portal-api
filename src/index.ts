import express from "express";
import http from 'http';
import appMiddleware from './app';

var app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
appMiddleware(app);

server.listen(port, () => {
    console.log(`Server is running on ${port}`);
}); 