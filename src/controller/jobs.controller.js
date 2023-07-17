import { pool } from "../db.js";

const actionJobsController = {
    //metod INDEX
    getJobs: async (req, res) => {
        try {
            const [rows] = (await pool.query('SELECT jobs.id, jobs.title, jobs.detail, jobs.date, jobs.price, jobs.idtype, jobs.iduser, jobs.idstate, jobs.created_at, jobs.updated_at, job_types.name as type, users.name as name, users.lastname, states.name as state   FROM jobs inner join job_types on job_types.id = jobs.idtype inner join users on users.id = jobs.iduser inner join states on states.id = jobs.idstate'));
            res.send(rows);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //SHOW A Jobs

    getOneJob: async (req, res) => {
        try {
            const [rows] = (await pool.query(('SELECT jobs.id, jobs.title, jobs.detail, jobs.date, jobs.price, jobs.idtype, jobs.iduser, jobs.idstate, jobs.created_at, jobs.updated_at, job_types.name as type, users.name as name, users.lastname, states.name as state   FROM jobs inner join job_types on job_types.id = jobs.idtype inner join users on users.id = jobs.iduser inner join states on states.id = jobs.idstate WHERE jobs.id = ?'), [req.params.id]));
            res.send(rows);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //METOD STORE
    createJob: async (req, res) => {
        try {
            console.log(req.body)
            const { title, detail, date, price, idtype, iduser, idstate } = req.body;
            const [rows] = await pool.query('INSERT INTO jobs (title, detail, date, price, idtype, iduser, idstate) VALUES (?,?,?,?,?,?,?)', 
            [title, detail, date, price, idtype, iduser, idstate]);
            res.send({ rows });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: 'Something wrong on server, function createJobs'
            })
        }
    },
    //METOD UPDATE
    updateJob: async (req, res) => {

        try {
            const { id } = req.params;
            const { title, detail, date, price, idtype, iduser, idstate } = req.body;
            const [result] = await pool.query('UPDATE jobs SET title = IFNULL(?,title), detail = IFNULL(?,detail), date = IFNULL(?,date), price = IFNULL(?,price), idtype = IFNULL(?,idtype), iduser = IFNULL(?,iduser), idstate = IFNULL(?,idstate) WHERE id = ?', 
            [title, detail, date, price, idtype, iduser, idstate, id]);
            //console.log(result)
            if (result.affectedRows === 0) return res.status(404).json({
                message: "Jobs not updated"
            }); res.sendStatus(204);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //metod DELETE
    deleteJob: async (req, res) => {

        try {
            const [result] = await pool.query('DELETE FROM jobs WHERE id = ?', [req.params.id]);

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

export default actionJobsController