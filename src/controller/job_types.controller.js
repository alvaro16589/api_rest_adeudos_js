import { pool } from "../db.js";

const actionJobTypesController = {
    //metod INDEX
    getJobTypes: async (req, res) => {
        try {
            const [rows] = (await pool.query('SELECT * FROM job_types'));
            res.send(rows);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //SHOW A JobTypes

    getOneJobTypes: async (req, res) => {
        try {
            const [rows] = (await pool.query(('SELECT * FROM job_types WHERE id = ?'), [req.params.id]));
            res.send(rows);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //METOD STORE
    createJobTypes: async (req, res) => {
        try {
            console.log(req.body)
            const { name } = req.body;
            const [rows] = await pool.query('INSERT INTO job_types (name) VALUES (?)', 
            [ name ]);
            res.send({ rows });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: 'Something wrong on server, function createJobTypes'
            })
        }
    },
    //METOD UPDATE
    updateJobTypes: async (req, res) => {

        try {
            const { id } = req.params;
            const { name} = req.body;
            const [result] = await pool.query('UPDATE job_types SET name = IFNULL(?,name) WHERE id = ?', 
            [name, id]);
            //console.log(result)
            if (result.affectedRows === 0) return res.status(404).json({
                message: "JobTypes not updated"
            }); res.sendStatus(204);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //metod DELETE
    deleteJobTypes: async (req, res) => {

        try {
            const [result] = await pool.query('DELETE FROM job_types WHERE id = ?', [req.params.id]);

            if (result.affectedRows === 0) return res.status(404).json({
                message: "Customer not found"
            }); res.sendStatus(204);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    }

}

export default actionJobTypesController