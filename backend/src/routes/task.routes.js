const router = require("express").Router();
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");
const task = require("../controllers/task.controller");

router.post("/", auth, task.createTask);
router.get("/", auth, task.getTasks);
router.delete("/:id", auth, task.deleteTask);

module.exports = router;
