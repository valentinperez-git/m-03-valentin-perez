import { Router } from "express";
import {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskControllers.js";
import { authRequired } from "../middlewares/tokenValidation.js";

const taskRouter = Router();

// Rutas para las tareas
taskRouter.get("/task", authRequired, getAllTasks);
taskRouter.post("/task", authRequired, createTask);
taskRouter.get("/task/:id", authRequired, getTaskById);
taskRouter.put("/task/:id", authRequired, updateTask);
taskRouter.delete("/task/:id", authRequired, deleteTask);

export default taskRouter;
