const IncomeModel = require("../Models/IncomeModel");

const addIncome = async (req, res) => {
  try {
    const { source, amount, emoji, date, user } = req.body;
    
    if (!source || !amount || !emoji || !date || !user) {
      return res.status(204).json({
        message: "Please fill fields",
        succuss: false,
      });
    }
    const userIncome = await IncomeModel.findOne({ user });
    let savedIncome = [];
    if (userIncome) {
      userIncome.incomes.push({
        source,
        amount,
        icon: emoji,
        date,
      });
      savedIncome = await userIncome.save();
    } else {
      let incomes = [];
      incomes.push({
        source,
        amount,
        icon: emoji,
        date,
      });
      const newIncome = new IncomeModel({ user, incomes });
      savedIncome = await newIncome.save();
    }
    res
      .status(200)
      .json({ message: "Income saved", succuss: true, data: savedIncome });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", succuss: false, error });
  }
};

const fetchIncomes = async (req, res) => {    
  try {
    const { user } = req.params;
    const data = await IncomeModel.findOne({ user });
    if (data.incomes.length === 0 || !data) {
      return res
        .status(204)
        .json({ message: "No income found", data: [], succuss: true });
    }
    res
      .status(200)
      .json({ message: "Income fetched", data: data, succuss: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", succuss: false, error });
  }
};

const DeleteIncome = async (req, res) => {
  try {
    const { incomeId, user } = req.body;
    const data = await IncomeModel.findOne({ user });
    if (!data) {
      return res.status(400).json({ message: "Bad request", succuss: false });
    }
    const deleteIncomeIndex = data.incomes.findIndex(
      (income) => income.id === incomeId
    );
    if (deleteIncomeIndex !== -1) {
      data.incomes.splice(deleteIncomeIndex, 1);
      const savedData = await data.save();
      res
        .status(200)
        .json({ message: "Income deleted", succuss: true, data: savedData });
    } else {
      res.status(404).json({ message: "Income not found", succuss: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", succuss: false, error });
  }
};


module.exports={DeleteIncome,fetchIncomes,addIncome}