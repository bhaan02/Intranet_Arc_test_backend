import cors from "cors";
import express from "express";
import passport from 'passport';
import config from "./config.js";
import './middlewares/microsoft.js';

import indexRouter from "./routes/index.js";
import loginRouter from './routes/microsoft.js';
import resourceRouter from "./routes/resource.js";

const app = express()

app.use(cors())

app.use(passport.initialize());
app.use("/auth", loginRouter)


app.set("port", config.port || 3000)

app.use(express.json())
app.use("/api",resourceRouter)
app.use(indexRouter)

export default app;