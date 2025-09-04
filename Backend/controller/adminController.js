const adminSchema = require("../model/adminModal");
const bcrypt = require("bcrypt");
const userSchema = require("../model/userModel");
const { default: asyncHandler } = require("../middlewares/asyncHandler");
const { default: createToken } = require("../utils/createToken");

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await adminSchema.findOne({ email });

    if (!admin) return res.status(404).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    createToken(req, res, admin._id);

    return res.status(200).json({ message: "Login successfully",  _id: admin._id, email: admin.email });
  } catch (error) {
    console.error(error);
    return res.status(500)({ message: "Something went wrong" });
  }
});

const editUser = asyncHandler(async (req, res) => {
  try {
    const { _id, email, password } = req.body;

    const usermail = await userSchema.findOne({ email , _id: { $ne: _id } });

    if (usermail) return res.status(409).json({ message: " User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userSchema.findOneAndUpdate(
      { _id: _id },
      { $set: { email, password: hashedPassword } }
    );

    return res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userSchema.findOneAndDelete({ _id: id });

    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

const addUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email });

    if (user) return res.status(409).json({ message: " User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userSchema({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json({ message: "Added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

const allUser = asyncHandler(async (req, res) => {
  try {
    const user = await userSchema.find();

    return res.status(200).json({ message: "Fetched data", data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

const logout = asyncHandler(async (req,res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expiresIn: new Date(0),
  });
  return res.status(200).json({ message: "Logged out successfully" });
});


module.exports = {
  login,
  editUser,
  deleteUser,
  addUser,
  allUser,
  logout
};
