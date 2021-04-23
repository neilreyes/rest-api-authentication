import mongoose from "mongoose";

const Schema = mongoose.Schema;
const travelLogSchema = new mongoose.Schema(
    {
        title: String,
        images: [String],
        content: String,
        user: { ref: "user", type: Schema.Types.ObjectId },
        place: {
            name: String,
            address: String,
            longtitude: { type: Number, required: true, min: -180, max: 90 },
            latitude: { type: Number, required: true, min: -90, max: 90 },
        },
        rating: {
            type: Number,
            min: 0,
            max: 10,
            default: 0,
        },
        visitDate: {
            required: true,
            type: Date,
        },
        comment: String,
    },
    {
        timestamps: true,
    }
);

const TravelLogModel = mongoose.model("travellog", travelLogSchema);
export default TravelLogModel;
