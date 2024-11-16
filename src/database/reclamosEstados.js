import {conexion} from "./conexion.js";

export default class ReclamosEstados{

    buscarTodos = async () => {
        const sql = 'SELECT * FROM reclamos_estado WHERE activo = 1;';
        const [result] = await conexion.query(sql);

        return result 
    }

    buscarPorId = async (id) => {
        const sql = `SELECT * FROM reclamos_estado WHERE activo = 1 AND idReclamoEstado = ?`;
        const [result] = await conexion.query(sql, [id]);

        return (result.length > 0) ? result[0] : null;
    
    }

    crear = async ({descripcion, activo}) => {
        const sql = 'INSERT INTO reclamos_estado (descripcion, activo) VALUES (?,?)';
        const [result] = await conexion.query(sql, [descripcion, activo]);
        
        console.log(result);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "No de pudo modificar el reclamo"
            })
        }
        
        return this.buscarPorId(result.insertId
        )
    
    }


    modificar = async (id, datos) => {
        const sql = 'UPDATE reclamos_estado SET ? WHERE idReclamoEstado = ?';
        const [result] = await conexion.query(sql, [datos, id]);
        return result
    }

    atender = async (req, res) => {
        try {
            const idReclamo = req.params.idReclamo
            const idReclamoEstado = req.body.idReclamoEstado

            const errorId = this.chequeoId(idReclamo);
            if (errorId) {
                return res.status(400).send(errorId);
            }

            const errorEstadoId = this.chequeoId(idReclamoEstado)
            if (errorEstadoId) {
                return res.status(400).send(errorEstadoId);
            }

            const data = {
                idReclamoEstado
            }

            const modificado = await this.service.atender(idReclamo, data)

            if (!modificado.estado) {
                return res.status(400).send({ estado: "ok", mensaje: modificado.mensaje });
            } else {
                return res.status(200).send({ estado: "ok", mensaje: modificado.mensaje });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({ estado: "error", mensaje: "Error interno en el servidor..." });
        }
    }

    // consultar = async (req, res) => { //! esto busca por body
    //     try {
    //         const idUsuarioCreador = req.user.idUsuario;

    //         //console.log(idUsuarioCreador)
    //         const error = this.chequeoId(idUsuarioCreador);
    //         if (error) {
    //             return res.status(400).send(error);
    //         }

    //         const result = await this.service.consultar(idUsuarioCreador);
    //         if (result === null) {
    //             return res.status(400).send({ mensaje: 'No tiene reclamos Creados' });
    //         }

    //         res.status(200).send({ estado: true, result: result });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).send({ error: "Error interno en el servidor" });
    //     }
    // }


    // cancelar = async (req, res) => {
    //     try {

    //         const idUsuarioCreador = req.user.idUsuario;
    //         const idReclamo = req.params.id;
    //         const error = this.chequeoId(idReclamo);
    //         if (error) {
    //             return res.status(400).json(error);
    //         }


    //         if (idUsuarioCreador === undefined) {
    //             return res.status(400).send({
    //                 estado: "Falla",
    //                 mensaje: "Faltan datos obligatorios."
    //             })
    //         }

    //         const reclamoCancelado = await this.service.cancelar(idReclamo, idUsuarioCreador)

    //         res.status(200).json({ estado: true, result: reclamoCancelado });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: "Error interno en el servidor" });
    //     }
    // }

    // informe = async (req, res) => {
    //     const formatosPermitidos = ['pdf', 'csv'];

    //     try {
    //         const formato = req.params.formato;
    //         console.log(formato)
    //         console.log(formatosPermitidos)
    //         if (!formato || !formatosPermitidos.includes(formato)) {
    //             return res.status(400).send({
    //                 estado: "Falla",
    //                 mensaje: "Formato inválido para el informe."
    //             })
    //         }

    //         const { buffer, path, headers } = await this.service.generarInforme(formato);
    //         res.set(headers)

    //         if (formato === 'pdf') {
    //             res.status(200).end(buffer);
    //         } else if (formato === 'csv') {
    //             res.status(200).download(path, (err) => {
    //                 if (err) {
    //                     return res.status(500).send({
    //                         estado: "Falla",
    //                         mensaje: " No se pudo generar el informe."
    //                     })
    //                 }
    //             })
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500).send({
    //             estado: "Falla", mensaje: "Error interno en servidor."
    //         });
    //     }
    // }

    // estadística = async (request, response) => {

    // }

    // oficina = async (request, response) => {
    //     try {
    //         const idUsuario = request.user.idUsuario;
    //         console.log("ID del usuario:", idUsuario);
    
    //         const oficina = await this.service.oficina(idUsuario);
    //         if (!oficina) {
    //             return response.status(404).json({ estado: "Falla", message: 'No hay oficina asociada al usuario.' });
    //         }
    
    //         response.status(200).json({ estado: true, result: oficina });
    //     } catch (error) {
    //         console.error("Error al obtener oficina:", error);
    //         response.status(500).json({ estado: "Falla", message: "Error interno del servidor al obtener la oficina." });
    //     }
    // };


}