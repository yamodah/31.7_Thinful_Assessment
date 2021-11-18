const router = require("express").Router();
const controller = require("./urls.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")

router.route("/:urlId/uses/:useId").get(controller.readUses).delete(controller.delete).all(methodNotAllowed)
router.route("/:urlId/uses").get(controller.listUses).all(methodNotAllowed)
router.route("/:urlId").get(controller.read).put(controller.update).all(methodNotAllowed)
router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed)

module.exports  = router