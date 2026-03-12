const Transaction = require("../models/Transaction");


// CREATE TRANSACTION
exports.createTransaction = async (req, res) => {
  try {

    const { amount, category, type, note, date } = req.body;

    const transaction = await Transaction.create({
      user: req.user.id,
      amount,
      category,
      type,
      note,
      date
    });

    res.json({
      
      id: transaction._id,
      user: transaction.user,
      amount: transaction.amount,
      category: transaction.category,
      type: transaction.type,
      note: transaction.note,
      date: transaction.date,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
      __v: transaction.__v
    });

  } catch (err) {
    res.status(500).json(err);
  }
};


// GET TRANSACTIONS
exports.getTransactions = async (req, res) => {
  try {

    const transactions = await Transaction.find({
      user: req.user.id
    });

    res.json(transactions);

  } catch (err) {
    res.status(500).json(err);
  }
};


// UPDATE TRANSACTION
exports.updateTransaction = async (req, res) => {
  try {

    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(transaction);

  } catch (err) {
    res.status(500).json(err);
  }
};


// DELETE TRANSACTION
exports.deleteTransaction = async (req, res) => {
  try {

    await Transaction.findByIdAndDelete(req.params.id);

    res.json({ message: "Transaction deleted" });

  } catch (err) {
    res.status(500).json(err);
  }
};
