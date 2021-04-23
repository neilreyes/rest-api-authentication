import { Router } from "express";
import { isAuthenticated } from "../../../middleware/authentication.middleware.js";

const router = Router();

/*
 *	@method GET
 *	@route /api/v1/profile
 * 	@desc Profile page
 */
router.get("/", isAuthenticated, (req, res) => {
    res.status(200).json({
        payload: req.user,
    });
});

export default router;
