import { dotEnvValues } from "./config.js";

import app from "./app.js";


app.listen( dotEnvValues.PORT_HOST);  
console.log('Servidor corriendo en el puerto : ', dotEnvValues.PORT_HOST);