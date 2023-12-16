import { body, validationResult } from "express-validator";

// VALIDACIÓN REGISTER
export const validateRegister = [
  body("username")
    .notEmpty().withMessage("El username no debe estar vacío")
    .isLength({ min: 6 }).withMessage("El username debe tener al menos 6 caracteres"),

  body("email")
    .isEmail().withMessage("Por favor, ingrese un correo electrónico válido"),

  body("password")
    .notEmpty().withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 }).withMessage("La longitud mínima de la contraseña es de 6 caracteres"),
];

// VALIDACIÓN DEL LOGIN
export const validateLogin = [
  body("email")
    .isEmail().withMessage("Por favor, ingrese un correo electrónico válido"),

  body("password")
    .notEmpty().withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 }).withMessage("La longitud mínima de la contraseña es de 6 caracteres"),
];

// MANEJO DE ERRORES DE VALIDACIÓN
export const handleErrorValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(400).json(errorMessages);
  }

  next();
};
