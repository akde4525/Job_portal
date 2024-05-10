
// API Documentation
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from "swagger-ui-express";
// packages import
//const express = require('express')

import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import "express-async-errors";
import morgan from 'morgan';

// security packages
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";

// files imports
import connectDB from "./config/db.js";

// routes imports

import errorMiddleware from './middlewares/errorMiddleware.js';
import authRoutes from "./routes/authRoutes.js";
import jobsRoute from "./routes/jobsRoute.js";
import testRoutes from "./routes/testRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// dot env config
dotenv.config()

// mongodb connection
connectDB();

// Swagger api config
// Swagger api options
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Job Portal Application",
            description: "Node Expressjs Job Portal Application",
        },
        servers: [
            {
                url: "http://localhost:8000",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const spec = swaggerJSDoc(options);

// rest object
const app = express()

//middlewares
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobsRoute);

// homeroute root
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));
// validation middleware
app.use(errorMiddleware);

//port 
const PORT = process.env.PORT || 8000;

// listen
app.listen(PORT, () => {
    console.log(`Node Server Running In ${process.env.DEV_MODE} Mode on Port No ${PORT}`);
})