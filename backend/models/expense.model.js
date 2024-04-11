const mongoose = require('mongoose')

const ExpenseSchema = mongoose.Schema ({
    title : {type : String, required : true },
    amount : { type : String, required : true},
    description : { type : String, require : true},
    author_name : { type : String},
    author_email : { type : String}
    },      
    {
    timestamps : true,
    }
)

const ExpenseModel = mongoose.model("expense", ExpenseSchema);

module.exports = ExpenseModel 