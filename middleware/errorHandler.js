const errorHandler = (res, e) => {
  res.status(500).json({ message: e.message });
};


module.exports = errorHandler