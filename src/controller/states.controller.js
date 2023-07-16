import { pool } from "../db.js";

const actionStatesController = {
    //metod INDEX
    getStates: async (req, res) => {
        try {
            const [rows] = (await pool.query('SELECT * FROM states'));
            res.send(rows);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //SHOW A States

    getOneStates: async (req, res) => {
        try {
            const [rows] = (await pool.query(('SELECT * FROM states WHERE id = ?'), [req.params.id]));
            res.send(rows);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //METOD STORE
    createStates: async (req, res) => {
        try {
            console.log(req.body)
            const { name } = req.body;
            const [rows] = await pool.query('INSERT INTO states (name) VALUES (?)', 
            [ name ]);
            res.send({ rows });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: 'Something wrong on server, function createStates'
            })
        }
    },
    //METOD UPDATE
    updateStates: async (req, res) => {

        try {
            const { id } = req.params;
            const { name} = req.body;
            const [result] = await pool.query('UPDATE states SET name = IFNULL(?,name) WHERE id = ?', 
            [name, id]);
            //console.log(result)
            if (result.affectedRows === 0) return res.status(404).json({
                message: "States not updated"
            }); res.sendStatus(204);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //metod DELETE
    deleteStates: async (req, res) => {

        try {
            const [result] = await pool.query('DELETE FROM states WHERE id = ?', [req.params.id]);

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

export default actionStatesController