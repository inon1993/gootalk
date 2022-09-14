const router = require("express").Router();
const auth = require("../middleware/auth-mid");
const settingsCtr = require("../controllers/settings-controller");

//--CREATE INITIAL SETTINGS--//
router.post("/create", settingsCtr.createSettings);

//--GET SETTINGS--//
router.get("/:id", auth, settingsCtr.getSettings);

//--UPDATE SETTINGS--//
router.put("/theme/:id", auth, settingsCtr.setTheme);

module.exports = router;
