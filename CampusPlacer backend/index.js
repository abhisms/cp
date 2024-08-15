const ConnectMongo = require('./db');
const env = require('dotenv');
const cors = require('cors');
const path = require('path')
const countsRouter = require('./routes/counts')
env.config()

ConnectMongo()

const express = require('express');
const app = express()
app.use(cors())
app.use(express.json())

app.get("/ab", (req, res) => {
    console.log("this is ab API")
    res.send("this is output")
})

app.use('/api/upload/', express.static("./uploads"))
app.use('/api/upload/photo', express.static("./uploads/photos"))
app.use('/api/upload/resume', express.static("./uploads/resume"))

app.use("/api/admin", require('./routes/adminRoutes'))
app.use("/api/category", require('./routes/categoryRoutes'))
app.use("/api/hod", require('./routes/hodRoutes'))
app.use("/api/branch", require('./routes/branchRoutes'))
app.use("/api/student", require('./routes/studentRoutes'))
app.use("/api/placement", require('./routes/placementRoutes'))
app.use("/api/job", require('./routes/joblistRoutes'))
app.use("/api/all", require('./routes/loginRoutes'))
app.use('/api', countsRouter)
app.use('/api/application', require('./routes/jobApplicationRoutes'))
app.use('/api/forgotpassword', require('./routes/forgotpasswordRoutes'))
app.use('/api/newpassword', require('./routes/newpasswordRoutes'))




//app.use(cors({origin:"http://localhost:3000",methods:["GET","POST"]}))



app.listen(process.env.PORT, () => {
    console.log("app listening on PORT:" + process.env.PORT)
})
