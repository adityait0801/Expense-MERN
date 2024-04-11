// expense.controller.js
const ExpenseModel = require('../models/expense.model');
const UserModel = require('../models/user.model');

const addExpense = async (req, res) => {
    const { title, amount, description } = req.body;
    const author_id = req.user_id;

    try {
        const user = await UserModel.findOne({ _id: author_id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const new_expense = new ExpenseModel({
            title,
            amount,
            description,
            author_name : user.email,
            author_email : user.email
        });

        await new_expense.save();
        res.status(200).json({ message: "Expense Added Successfully", new_expense });
    } catch (err) {
        // console.error("Error adding expense:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getExpenses = async(req, res)=> {
    const expenses = await ExpenseModel.find();
    res.send({expenses : expenses})
}

const deleteExpenses = async (req, res)=> {
    const expenseID = req.params.expenseID; // to get the id from url
    //const payload = req.body; // to get the updated data from user
    
    const user_id = req.user_id;
    try {
        const user = await UserModel.findOne({ _id: user_id });
        if (!user) {
            return res.status(404).send("User not found");
        }

        const user_email = user.email;

        const expense = await ExpenseModel.findOne({ _id: expenseID }); // Corrected to use _id instead of expenseID
        if (!expense) {
            return res.status(404).send("Expense not found");
        }

        const expense_user_email = expense.author_email;

        if (user_email !== expense_user_email) {
            return res.send("You are not Authorized to Delete this Expense");
        } else {
            await ExpenseModel.findByIdAndDelete(expenseID);
            res.send(`Expense ${expenseID} deleted`);
        }
    } catch (error) {
        console.log("Error deleting expense:", error);
        res.status(500).send("Internal server error");
    }
}

const updateExpense = async (req, res) => {
    const expenseID = req.params.expenseID;
    const { title, amount, description } = req.body;
    const user_id = req.user_id;

    try {
        const user = await UserModel.findOne({ _id: user_id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const expense = await ExpenseModel.findById(expenseID);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        if (user.email !== expense.author_email) {
            return res.status(403).json({ message: "You are not authorized to update this expense" });
        }

        // Update expense fields
        expense.title = title;
        expense.amount = amount;
        expense.description = description;

        await expense.save();

        res.status(200).json({ message: "Expense updated successfully", updatedExpense: expense });
    } catch (error) {
        console.error("Error updating expense:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    addExpense,
    getExpenses, 
    deleteExpenses,
    updateExpense
};


