const router = require("express").Router();
const logoutCtr = require("../controllers/logout-controller");

router.get("/", logoutCtr);

module.exports = router;
