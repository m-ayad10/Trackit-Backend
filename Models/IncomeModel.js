const mongoose=require('mongoose')

const IncomeScheema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    incomes:[{
        account:{
            type:String,
            default:'income'
        },
        source:{
            type:String,
            required:true
        },
        icon:{
            type:String,
            required:true
        },
        amount:{
            type:Number,
            required:true
        },
        date:{
            type:Date,  
            required:true
        }
    }],
    total:{
        type:Number
    }
})

IncomeScheema.pre('save',function(next){
    this.total=this.incomes.reduce((acc,income)=>acc+income.amount,0)
    next()
})

const IncomeModel=mongoose.model('income',IncomeScheema)
module.exports=IncomeModel