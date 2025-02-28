import mongoose from "mongoose";

const plansSchema = new mongoose.Schema({
    planType:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        require:true
    },
    planDuration:{
        type:String,
        require:true
    },
    features:[
        {
            featureName:String,
            featureDescription:String
        }
    ]
});

const Plan = mongoose.Schema.Plan || mongoose.model("Plan",plansSchema);
export default Plan;