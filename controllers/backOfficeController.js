const Module = require("../models/moduleModel");

exports.createModule = async (req, res) => {
  const { id, active, componentName, children } = req.body;

  try {
    await Module.create({ id, active, componentName, children });

    res.status(201).json({
      status: "success",
      id,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getComponentName = async (req, res) => {
  try {
    const { componentName } = await Module.findOne({
      id: req.params.id,
    })

    // TODO: REALIZAR VALIDACIONES.

    res.status(201).json({
      status: "success",
      componentName,
      children,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getModules = async (req, res) => {
  try {
    const data = await Module.find();

    await migrationDB(data);

    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

async function migrationDB(data) {
  if (data.length) {
    data.forEach(async (module) => {
      module.children.forEach(async (childId) => {
        await Module.findOneAndUpdate(
          { id: childId },
          { parentId: module.id }
        );
      });
      await Module.findOneAndUpdate({id: module.id}, {$unset: {children: 1}});
    });
  }
}

