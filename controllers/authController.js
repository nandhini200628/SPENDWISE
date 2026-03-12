const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async(req,res)=>{
 try{
   const {name,email,password} = req.body;

   const hashed = await bcrypt.hash(password,10);

   const user = await User.create({
       name,
       email,
       password:hashed
   });

   res.json(user);

 }catch(err){
   res.status(500).json(err);
 }
};


// LOGIN
exports.login = async(req,res)=>{
 try{
   const {email,password} = req.body;

   const user = await User.findOne({email});

   if(!user) return res.status(400).json("User not found");

   const match = await bcrypt.compare(password,user.password);

   if(!match) return res.status(400).json("Invalid password");

   const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

res.json({
  id: user._id,
  name: user.name,
  email: user.email,
  token: token
});
}
catch(err){
   res.status(500).json(err);
 }
};
