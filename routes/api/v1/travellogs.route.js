import { Router } from "express";
import { isAuthenticated } from "../../../middleware/authentication.middleware.js";
import TravelLogModel from "../../../model/travellog.model.js";

const router = Router();

router.get("/", isAuthenticated, (req, res) => {
    return res.status(200).json({ message: "reached" });
});

router.post("/", (req, res) => {
    console.log("test");
    const { title, images, content, place, rating, comment } = req.params;

    const { name, address, longtitude, latitude } = place;

    return res.status(200).json(req.params);

    // const travellog = new TravelLogModel({
    //     title,
    //     images,
    //     content,
    //     user: req.user._id.toString(),
    //     place: {
    //         name,
    //         address,
    //         longtitude,
    //         latitude,
    //     },
    //     rating,
    //     visitDate: new Date.now(),
    //     comment,
    // });

    //const entry = await travellog.save();

    //return res.status(200).json({ payload: travellog });
});

export default router;
