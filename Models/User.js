const mongoose=require('mongoose');
const joi=require('joi');
require('dotenv').config();


const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, index: true }, // Adding index to email field
    phone: { type: Number, required: true, index: true }, // Adding index to phone field
    role: { type: String, required: true, index: true },
    password: { type: String, required: true },
    image: { type: String, required: false },
    isVerified: { type: Boolean, default: false },
    subscribed: { type: Boolean, default: false },
});

const validateUser = (data) => {
    const schema = joi.object({
        firstName: joi.string().required().label('First Name'),
        lastName: joi.string().required().label('Last Name'),
        email: joi.string().email().required().label('Email'),
        phone: joi.number().required().label('Phone Number'),
        role: joi.allow(null).label('Role'),
        password:  joi.string().min(6).required().label('Password'),
        image: joi.allow(null).label('Image'),

    });
    return schema.validate(data);
};

const validateOnLogin = (data) => {
    const schema = joi.object({
        email_phone: joi.string().required().label('Email or Phone'),
        password: joi.string().required().label('Password'),
    });
    return schema.validate(data);
};

const User=mongoose.model('User',userSchema);
module.exports={
    User,
    validateUser,
    validateOnLogin,
}
