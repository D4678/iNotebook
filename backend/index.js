//The Below(neeche) Code is Connected to the Database

const express = require('express')
const exphbs = require('express-handlebars')
var cors = require('cors')

const app = express()
app.use(cors());
app.engine('handlebars',exphbs.engine());
app.set('view engine','handlebars');

require('./db')

//  This is Middleware
app.use(express.json())  //(if i have used the req.body so that we use the middlware) (undefined problem) (45 video)

// Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Example app listening at http://localhost:${PORT}`))

//The Above Code is Connected to the Database


 