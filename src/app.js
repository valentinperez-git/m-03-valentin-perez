import express from "express";
import { settingDotEnvDB } from "./config/dotenv.js";
import cors from "cors";
import morgan from "morgan";
import { connectMongo } from "./database/db.js";
import authRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
const { port, database, secretToken } = settingDotEnvDB();

// Conectar a la base de datos
connectMongo();

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal!");
});

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Configuración de CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Rutas
app.use(authRoutes);
app.use(taskRoutes);

const PORT = port || 5173; 

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
