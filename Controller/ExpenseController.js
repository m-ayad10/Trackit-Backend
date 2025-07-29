const ExpenseModel = require("../Models/ExpenseModel");

const addExpense = async (req, res) => {
  try {
    const { category, amount, emoji, date, user } = req.body;
    
    if (!category || !amount || !emoji || !date || !user) {
      return res.status(204).json({
        message: "Please fill fields",
        succuss: false,
      });
    }
    const userExpense = await ExpenseModel.findOne({ user });
    let savedExpense = [];
        
    if (userExpense) {
      userExpense.expenses.push({
        category,
        amount,
        icon: emoji,
        date,
      });
      savedExpense = await userExpense.save();
    } else {
      let Expenses = [];
      Expenses.push({
        category,
        amount,
        icon: emoji,
        date,
      });
      const newExpense = new ExpenseModel({ user, expenses:Expenses });
      savedExpense = await newExpense.save();
    }
    res
      .status(200)
      .json({ message: "Expense saved", succuss: true, data: savedExpense });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", succuss: false, error });
  }
};

const fetchExpenses = async (req, res) => {
  try {
    const { user } = req.params;
    
    const data = await ExpenseModel.findOne({ user });
    if (data.expenses.length === 0 || !data) {
      return res
        .status(204)
        .json({ message: "No Expense found", data: [], succuss: true });
    }
    res
      .status(200)
      .json({ message: "Expense fetched", data: data, succuss: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", succuss: false, error });
  }
};

const DeleteExpense = async (req, res) => {
  try {
    const { expenseId, user } = req.body;
    
    const data = await ExpenseModel.findOne({ user });
    if (!data) {
      return res.status(400).json({ message: "Bad request", succuss: false });
    }
    const deleteExpenseIndex = data.expenses.findIndex(
      (expense) => expense.id === expenseId
    );
    
    if (deleteExpenseIndex !== -1) {
      data.expenses.splice(deleteExpenseIndex, 1);
      const savedData = await data.save();
      res
        .status(200)
        .json({ message: "Expense deleted", succuss: true, data: savedData });
    } else {
      res.status(404).json({ message: "Expense not found", succuss: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", succuss: false, error });
  }
};


module.exports={DeleteExpense,fetchExpenses,addExpense}