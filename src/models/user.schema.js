import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
    },
    lastName:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        default:null
    },
    phone:{
        type:String,
        default:null,
    },
    clientName:{
        type:String,
        default:null
    },
    planType:{
        type:String,
        default:"single"
    },
    clientDomain:{
        type:String,
        default:null
    },
    planDuration:{
        type:Date,
        default:null
    },
    freeTrial :{
        type:Boolean,
        default:true
    },
    freeTrialDays:{
        type:Number,
        default:7
    },
    platforms:[
        {
            platformName:{
                type:String,
                default:null
            },
            accessToken:{
                type:String,
                default:null
            }
        }
    ]
},{timestamps:true},{strict: false});

// For Temp using planType as String after Plan Schema Ready Replace it with this .
// planType: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' }

const User = mongoose.models.User || mongoose.model("User",userSchema);
export default User;