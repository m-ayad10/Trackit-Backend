const mongoose = require("mongoose");

const ExpenseScheema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  expenses: [
    {
      account: {
        type: String,
        default: "expense",
      },
      category: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
  },
});

ExpenseScheema.pre("save", function (next) {
  this.total = this.expenses.reduce((acc, expense) => acc + expense.amount, 0);
  next();
});

const ExpenseModel = mongoose.model("expense", ExpenseScheema);

module.exports = ExpenseModel;
