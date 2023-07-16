import { pool } from "../db.js";

const actionTypeUsersController = {
    //metod INDEX
    getTypeUsers: async (req, res) => {
        try {
            const [rows] = (await pool.query('SELECT * FROM type_users'));
            res.send(rows);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //SHOW A TypeUsers

    getOneTypeUsers: async (req, res) => {
        try {
            const [rows] = (await pool.query(('SELECT * FROM type_users WHERE id = ?'), [req.params.id]));
            res.send(rows);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //METOD STORE
    createTypeUsers: async (req, res) => {
        try {
            console.log(req.body)
            const { name } = req.body;
            const [rows] = await pool.query('INSERT INTO type_users (name) VALUES (?)', 
            [ name ]);
            res.send({ rows });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: 'Something wrong on server, function createTypeUsers'
            })
        }
    },
    //METOD UPDATE
    updateTypeUsers: async (req, res) => {

        try {
            const { id } = req.params;
            const { name} = req.body;
            const [result] = await pool.query('UPDATE type_users SET name = IFNULL(?,name) WHERE id = ?', 
            [name, id]);
            //console.log(result)
            if (result.affectedRows === 0) return res.status(404).json({
                message: "TypeUsers not updated"
            }); res.sendStatus(204);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //metod DELETE
    deleteTypeUsers: async (req, res) => {

        try {
            const [result] = await pool.query('DELETE FROM type_users WHERE id = ?', [req.params.id]);

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

export default actionTypeUsersController