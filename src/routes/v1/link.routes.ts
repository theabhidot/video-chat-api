import * as express from "express";
import { LinkController } from "../../controllers/link.controllers";

const router = express.Router();

router.get(
  "/",
  LinkController.getLink
);

module.exports = router;