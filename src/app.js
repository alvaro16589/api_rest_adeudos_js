import express from "express";
import JobsRoutes from './routes/jobs.routes.js';
import JobsTypesRoutes from './routes/job_types.routes.js';
import StatesRoutes from './routes/states.routes.js';
import TypeUsersRoutes from './routes/type_users.routes.js';
import UsersRoutes from './routes/user.routes.js';
//import routes
const app = express();
app.use(express.json())//convert  body to jSon sentence
const pref = '/api';
app.use((req, res, next) => {//permisos cors para los request 
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
})

//connect to routes
app.use(pref, JobsRoutes);
app.use(pref, JobsTypesRoutes);
app.use(pref, StatesRoutes);
app.use(pref, TypeUsersRoutes);
app.use(pref, UsersRoutes);
//views

//middlewere

app.unsubscribe((req, res, next) => {
    res.status(400).json({
        message: 'Route not found'
    })
})

export default app
