import express from "express";
import ReclamosControllers from "../../controllers/reclamosControllers.js";
import { verifyToken, checkRole } from "../../middlewares/authMiddlewares.js"; 
import { Roles } from "../../middlewares/roles.js";

const router = express.Router();
const reclamosControllers = new ReclamosControllers();

// 1. Listar reclamos por oficinas para empleados
router.get("/listar", verifyToken, checkRole([2]), reclamosControllers.listar);

// 2. Ruta estadísticas para administrador
router.get('/estadisticas', verifyToken, checkRole([1]), reclamosControllers.verEstadisticas);

// 3. Ruta descargar informe para administrador
router.get("/informe/:formato?", verifyToken, checkRole([1]), reclamosControllers.informe);

// 4. Ruta consultar para clientes
router.get('/consultar/', verifyToken, checkRole([3]), reclamosControllers.consultar);

// 5. Ruta cancelar reclamos para clientes
router.patch('/cancelar/:idReclamo', verifyToken, checkRole([3]), reclamosControllers.cancelar);

// 6. Ruta buscar reclamo específico por ID para administrador
router.get("/:idReclamo", verifyToken, checkRole([1]), reclamosControllers.buscarPorId);

// 7. Ruta atender reclamos para empleados
router.put('/atender/:idReclamo', verifyToken, checkRole([2]), reclamosControllers.atender);

// 8. Ruta modificar reclamos para administrador
router.patch("/:idReclamo", verifyToken, checkRole([1]), reclamosControllers.modificar);

// 9. Ruta crear reclamos para clientes
router.post('/', verifyToken, checkRole([3]), reclamosControllers.crear);

// 10. Ruta ver todos los reclamos para administrador
router.get("/", verifyToken, checkRole([1]), reclamosControllers.buscarTodos);


export { router };