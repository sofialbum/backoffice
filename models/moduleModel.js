const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "an id is required"],
  },
  active: {
    type: Boolean,
  },
  componentName: {
    type: String,
    required: [true, "a component name is required"],
    unique: true,
  },
  children: [
    {
      type: String,
    },
  ],
  parentId: {
    type: String,
    required: false
  }
});

const Module = mongoose.model("Module", moduleSchema);

module.exports = Module;
