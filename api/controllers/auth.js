import User from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const signIn = async (req, res) => {
  const {username, password} = req.body
  try {
    const isRegistered = await User.findOne({username})
    const verifyPassword = await bcrypt.compare(password, isRegistered.password)
    if(!verifyPassword){
      return res.status(401).json('Invalid username or password')
    }
    console.log(isRegistered)
    const token = jwt.sign({id: isRegistered._id}, process.env.JWT_SECRET, {expiresIn: 60*60})
    const userInfo = {...isRegistered._doc}
    delete userInfo.password
    res.status(200).json({message:'You are authenticated!', success: true, access_token: token, userInfo})
  } catch (error) {
    res.json({error, success: false})
  }
};

const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  let hash = undefined
  try {
    hash = await bcrypt.hash(password, 10)
  } catch (error) {
    console.log('hashing error: ', error)
  }
  // if the username or email already exists
  const userExists = await User.findOne({$or: [{username}, {email}]})
  console.log(userExists)
  if(userExists){
    return res.status(409).json({message: "User already exists", success: false})
  }
  const user = new User({ username, email, password: hash });
  try {
    await user.save();
    res.status(201).json({ message: "User created successfully", success: true });
  } catch (error) {
    res.status(500).json({ error, success: false });
  }
};

export { signIn, signUp };
