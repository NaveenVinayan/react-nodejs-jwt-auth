const { default: mongoose } = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Use `export default` to export the model
module.exports = mongoose.model("admin", adminSchema);