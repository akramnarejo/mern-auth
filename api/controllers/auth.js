import User from "../models/user.js";
import bcrypt from 'bcrypt'


const signIn = (req, res) => {
  const {username, password} = req.body
  try {
    
  } catch (error) {
    
  }
  res.json({ message: "You are authenticated" });
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
    return res.status(409).json({message: "User already exists"})
  }
  const user = new User({ username, email, password: hash });
  try {
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export { signIn, signUp };
