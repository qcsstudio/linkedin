import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    clientName:{
        type:String,
        require:true
    },
    planType:{
        type:String,
        require:true
    },
    clientDomain:{
        type:String,
        require:true
    },
    planDuration:{
        type:Date,
        default:null
    },
    freeTrial:{
        type:Boolean,
        default:true
    },
    freeTrialDays:{
        type:Number,
        default:7
    }

},{timestamps:true});

const Client = mongoose.Schema.Client || mongoose.model("Client",clientSchema);
export default Client;