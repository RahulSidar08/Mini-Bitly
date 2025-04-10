import express from "express"
import { getAllUrl, getSingleUrlDetail, shortenUrl, urlDetails } from "../controllers/urlController.js";
import isAuthenticated from "../middlewares/auth.js";
const router = express.Router();
router.route("/shorten").post(isAuthenticated,shortenUrl)
router.route("/getUrl").get(isAuthenticated,getAllUrl)
router.route("/:shortCode").get(isAuthenticated,urlDetails)
router.route("/get/:shortCode").get(isAuthenticated,getSingleUrlDetail)
export default router;