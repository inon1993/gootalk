const router = require("express").Router();
const auth = require("../middleware/auth-mid");
const settingsCtr = require("../controllers/settings-controller");

//--CREATE INITIAL SETTINGS--//
router.post("/create", settingsCtr.createSettings);

//--GET SETTINGS--//
router.get("/:id", settingsCtr.getSettings);

//--UPDATE SETTINGS--//
router.put("/theme/:id", settingsCtr.setTheme);

module.exports = router;
