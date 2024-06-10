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
  },
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  workingHours: {
    start: {
      type: String,
    },
    end: {
      type: String,
    }
  }
});

const Module = mongoose.model("Module", moduleSchema);

module.exports = Module;
