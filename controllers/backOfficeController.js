const Module = require("../models/moduleModel");

exports.createModule = async (req, res) => {
  const { id, active, componentName, children, title, description } = req.body;

  try {
    await Module.create({ id, active, componentName, children, title, description });

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
    const { componentName, id, title, description, workingHours, active } = await Module.findOne({
      id: req.params.id,
    })

    const childrenModules = await Module.find({parentId: id}) || [];

    const children = childrenModules.map(child => child.id)

    const isWithinHours = isWithinWorkingHours(workingHours.start, workingHours.end);
  
    // TODO: REALIZAR VALIDACIONES.

    res.status(201).json({
      status: "success",
      componentName,
      children, 
      title,
      description,
      isWithinHours,
      active
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

    // await migrationDB(data);
    await updateWorkingHours(data);

    res.status(201).json({
      status: "success",
      data
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

async function updateWorkingHours(data) {
  if (data.length) {
    data.forEach( async (module) => {
      const start = "08:00";
      const end = "18:00";

      await Module.findOneAndUpdate({ _id: module._id}, {workingHours: {start, end}});
    })
  }
}

function isWithinWorkingHours(start, end) {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  if (currentHour < startHour || (currentHour === startHour && currentMinute < startMinute)) {
    // La hora actual es anterior al inicio del horario de funcionamiento
    return false;
  }

  if (currentHour > endHour || (currentHour === endHour && currentMinute >= endMinute)) {
    // La hora actual es posterior al final del horario de funcionamiento
    return false;
  }

  // La hora actual está dentro del horario de funcionamiento
  return true;
}
