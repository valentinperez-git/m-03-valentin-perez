import Task from "../models/taskModel.js";

export const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find({ user: req.user.id }).populate("user");
    res.status(200).json(allTasks);
  } catch (error) {
    return res.status(400).json({ message: "Error al buscar todas las tareas", error });
  }
};

export const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const taskFound = await Task.findById(id);

    if (!taskFound)
      return res.status(404).json({ message: "No se encontró la tarea" });
    res.status(200).json(taskFound);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al buscar la tarea por Id", error });
  }
};

//TODO: POST CREAR TAREA
export const createTask = async (req, res) => {
  const { title, description, completed, date } = req.body;
  try {
    const newTask = new Task({
      title,
      description,
      completed,
      date,
      user: req.user.id,
    });

    const savedTask = await newTask.save();
    res.status(200).json(savedTask);
  } catch (error) {
    return res.status(400).json({ message: "Error al crear la tarea", error });
  }
};

//TODO: PUT ACTUALIZAR TAREA
export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("user");

    if (!updateTask)
      return res.status(404).json({ message: "Tarea no encontrada" });

    res.status(200).json(updatedTask);
  } catch (error) {}
};

//TODO: DELETE ELIMINAR TAREA
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask)
      return res
        .status(404)
        .json({ message: "No se encontró la tarea para eliminar" });
    res.status(200).json({ message: "Tarea eliminada" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al intentar eliminar la tarea", error });
  }
};
