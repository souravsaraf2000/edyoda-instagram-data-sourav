const express = require('express')
const postRoutes = require('./routes')
const app = express()

// const port = 8000

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use('/',postRoutes)


// app.listen(port, ()=>{
//     console.log('Server live and running at port ',port,'...')
// })

app.listen(process.env.PORT || 5000)