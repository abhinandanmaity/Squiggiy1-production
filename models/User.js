

const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({

    roll: { type: String, default: 'user' },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String, default: "" },
    phone: { type: Number },
    address: { type: String },
    state: { type: String },
    city: { type: String },
    pincode: { type: String },
    resetToken: { type: String },
    expireToken: { type: Date },
    presetToken: { type: String },
    pexpireToken: { type: Date },


}, { timestamps: true });

mongoose.models = {}
export default mongoose.model("User", UserSchema);


// const User = mongoose.models.User || mongoose.model('User', UserSchema);
// export default User;