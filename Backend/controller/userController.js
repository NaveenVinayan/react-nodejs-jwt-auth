const userSchema = require("../model/userModel");
const bcrypt = require("bcrypt");
const { default: createToken } = require("../utils/createToken");
const { default: asyncHandler } = require("../middlewares/asyncHandler");
const saltround = 10;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({email} );
    console.log(user)

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    

    // ✅ set session or token
    createToken(req, res, user._id);

    return res
      .status(200)
      .json({ message: "Login successful", _id: user._id, email: user.email });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password ,'data')
    const user = await userSchema.findOne({ email });

    if (user) return res.status(409).json({ message: " User already exists" });

    const hashedPassword = await bcrypt.hash(password, saltround);

    const newUser = new userSchema({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    createToken(req, res, newUser._id);

    res.status(200).json({ message: "User created succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const logout = asyncHandler(async (req,res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expiresIn: new Date(0),
  });
  return res.status(200).json({ message: "Logged out successfully" });
});

module.exports = {
  logout,
  registerUser,
  login
}