import mongoose from "mongoose";

const rolesSchema = new mongoose.Schema({
    clientName :{
        type:String,
        require:true
    },
    roleName:{
        type:String,
        require:true
    },
    permissions:{
        type:[String]
    }
});

const Role = mongoose.Schema.Role || mongoose.model("Role",rolesSchema);
export default Role;