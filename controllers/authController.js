import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {

    const { name, email, password } = req.body;
    // validate
    if (!name) {
        // return res.status(400).send({ success: false, message: 'Please Provide Name' })
        next("Name is Required.")
    }
    if (!email) {
        // return res.status(400).send({ success: false, message: 'Please Provide Email' })
        next("Email is Required.")
    }
    if (!password) {
        // return res.status(400).send({ success: false, message: 'Please Provide Password' })
        next("Password is Required.")
    }

    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
        // return res.status(200).send({
        //     success: false,
        //     message: 'Email is already Register, Please LogIn'
        // })
        next('Email is already Register, Please LogIn');
    }
    const user = await userModel.create({ name, email, password });
    //token
    const token = user.createJWT();
    res.status(201).send({
        success: true,
        message: 'User Created Successfully.',
        user: {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            location: user.location,
        },
        token,
    })

};

export const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
        next('Please Provide All Fields.');
    }
    // find user by mail
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        next('Invalid Username or Password');
    }
    // compare password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        next('Inavlid Username or Password')
    }
    user.password = undefined;
    const token = user.createJWT()
    res.status(200).json({
        success: true,
        message: 'LogIn Successfully.',
        user,
        token,
    })
};