const express = require('express');
const app = express();
const PORT= 3000;

app.use(express.json());

const api1Routes = require('./routes/api1');
const api2Routes = require('./routes/api2');
const api3Routes = require('./routes/api3');

app.use("/api1", api1Routes)
app.use("/api2", api2Routes)
app.use("/api3", api3Routes)

app.listen(PORT, () => { console.log("Server running"); })