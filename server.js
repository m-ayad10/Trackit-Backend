const express=require('express')
const app=express()
const cors=require('cors')
const bodyParser=require('body-parser')
const db = require('./db')
const UserRouter = require('./Routes/UserRoutes')
const IncomeRouter = require('./Routes/IncomeRoutes')
const ExpenseRouter = require('./Routes/ExpenseRoutes')
const cookieParser = require("cookie-parser");

app.use(cookieParser());

require('dotenv').config()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
const Port=process.env.PORT
app.listen(Port,()=>{
    console.log('Server started',Port);
})

app.get('/',()=>{
    console.log('hello');
})

app.use('/',UserRouter)
app.use('/income',IncomeRouter)
app.use('/expense',ExpenseRouter)