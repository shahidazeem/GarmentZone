const express = require('express');
const App = express();
const cors = require('cors');
const router = require('./routes/router');
const PORT = process.env.PORT || 4001;
const errorhandler = require('./controllers/error/error');
const path = require('path');
require("./config/database");
//to receive every requst in json form
App.use(express.json());
App.use(cors());
App.use(express.static(path.join(__dirname, "public")));
//send every api call to router
App.use("/api",router);

App.use(errorhandler);
App.listen(PORT, ()=>{
    console.log('Server Connected at PORT ', PORT)
})
