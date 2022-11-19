import mongoose, { Schema } from "mongoose";
import { RawApplication } from "../types";

const applicationSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
      }],
}, { timestamps: true });

const Application = mongoose.model<RawApplication>("Application", applicationSchema);

export default Application;
