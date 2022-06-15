const router = require("express").Router();
const refreshCtr = require("../controllers/refreshToken-controller");

router.get("/", refreshCtr);

module.exports = router;
