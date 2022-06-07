const auth = async (req, res, next) => {
  console.log("middleware");
  next();
};

module.exports = auth;
