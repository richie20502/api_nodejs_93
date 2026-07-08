import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        unique: false  
    },
    email:{
        type: String,
        required: true,
        unique: true,  
        lowercase: true 
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
},{
    timestamps: true
});


userSchema.pre("save",async function(){
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password); 
}

export default mongoose.model('User', userSchema);



