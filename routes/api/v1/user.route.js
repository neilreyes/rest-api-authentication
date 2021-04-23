import { Router } from "express";
import {
    getUsers,
    userRegister,
    userLogout,
    getUserById,
    deleteUser,
} from "../../../controller/user.controller.js";
import {
    isAdmin,
    isAuthenticated,
} from "../../../middleware/authentication.middleware.js";
import passport from "passport";

const router = Router();

/*
 *   @method GET
 *   @route /api/v1/user/
 *   @desc Get all users
 */
router.get("/", isAdmin, getUsers);

router.get("/logout", userLogout);

/*
 *   @method GET
 *   @route /api/v1/user/:id
 *   @desc Get user by ID
 *   @access private
 */
router.get("/:_id", isAuthenticated, getUserById);

/*
 *   @method GET
 *   @route /api/v1/user/reset
 *   @desc User request password reset
 */
router.get("/reset", (req, res, next) => {
    res.status(200).json({ message: "POST api/v1/user/reset" });
});

/*
 *   @method DELETE
 *   @route /api/v1/user/_:id
 *   @desc Remove user
 *   @access private
 */
router.delete("/:_id", isAuthenticated, deleteUser);

/*
 *   @method POST
 *   @route /api/v1/user/login
 *   @desc User login
 *   @access public
 */
router.post(
    "/login",
    passport.authenticate("local", { successRedirect: "/api/v1/profile" })
);

/*
 *   @method POST
 *   @route /api/v1/user/register
 *   @desc User register
 * 	@access public
 */
router.post("/register", userRegister);

export default router;
