const Module = require("../models/moduleModel");

exports.createModule = async (req, res) => {
  const { id, active, componentName } = req.body;

  try {
    await Module.create({ id, active, componentName});

    res.status(201).json({
      status: "success",
      id

    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
}


exports.getComponentName = async (req, res) => {

  try {
    //VER ACA SI ESTA BIEN EL FINDONE!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const { componentName } = await Module.findOne({id: req.params.id});

    res.status(201).json({
      status: "success",
      componentName

    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }

}

