import { configDotenv } from "dotenv";
configDotenv();

import {connectDB} from "./utils/db.js";
import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import helmet from "helmet";
import cookieParser from "cookie-parser";
import compression from "compression";
import { apiRoutes } from "./routes/endpoints.js";
import { cspOptions, PORT } from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app=express();
app.set('trust proxy', 1);


//load extensions
app.use(cookieParser());
app.use(express.json());
app.use(compression());

// security headers
app.use(helmet({
    contentSecurityPolicy: cspOptions
}));
 
app.use("/api", apiRoutes);
app.use(express.static(path.join(__dirname, '../dist'), { maxAge: '360d' }));
app.use(express.static('../public', { maxAge: '360d' }));

// route react app
app.get('*', (req, res) => {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
  });


app.listen(PORT, async () => {
    await connectDB();
    console.log(`[+] Server is running on port ${PORT}`);
});