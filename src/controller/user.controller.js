import { pool } from "../db.js";

const actionUsersController = {
    //metod INDEX
    getUsers: async (req, res) => {
        try {
            const [rows] = (await pool.query('SELECT users.id, users.name, users.lastname, users.nameac, users.idtype, users.idstate, users.email, users.email_verified_at, users.password, users.remember_token, users.created_at, users.updated_at, type_users.name AS type, states.name AS state FROM users INNER JOIN type_users ON users.idtype = type_users.id INNER JOIN states on users.idstate = states.id'));
            res.send(rows);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //SHOW A Users

    getOneUser: async (req, res) => {
        try {
            const [rows] = (await pool.query(('SELECT users.id, users.name, users.lastname, users.nameac, users.idtype, users.idstate, users.email, users.email_verified_at, users.remember_token, users.created_at, users.updated_at, type_users.name AS type, states.name AS state FROM users INNER JOIN type_users ON users.idtype = type_users.id INNER JOIN states on users.idstate = states.id WHERE users.nameac = ? AND users.password = ?'), [req.params.nameac, req.params.password]));
            res.send(rows);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //METOD STORE
    createUser: async (req, res) => {
        try {
            console.log(req.body)
            const { name, lastname, nameac, idtype, idstate, email, email_verified_at, password, remember_token } = req.body;
            const [rows] = await pool.query('INSERT INTO users (name, lastname, nameac, idtype, idstate, email, email_verified_at, password, remember_token) VALUES (?,?,?,?,?,?,?,?,?)', 
                [name, lastname, nameac, idtype, idstate, email, email_verified_at, password, remember_token]);
            res.send({ rows });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: 'Something wrong on server, function createUsers'
            })
        }
    },
    //METOD UPDATE
    updateUser: async (req, res) => {

        try {
            const { id } = req.params;
            const { name, lastname, nameac, idtype, idstate, email, email_verified_at, password, remember_token } = req.body;
            const [result] = await pool.query('UPDATE users SET name = IFNULL(?,name), lastname = IFNULL(?,lastname), nameac = IFNULL(?,nameac), idtype = IFNULL(?,idtype), idstate = IFNULL(?,idstate), email = IFNULL(?,email), email_verified_at = IFNULL(?,email_verified_at), password = IFNULL(?,password), remember_token = IFNULL(?,remember_token) WHERE id = ?',
                [name, lastname, nameac, idtype, idstate, email, email_verified_at, password, remember_token, id]);
            //console.log(result)
            if (result.affectedRows === 0) return res.status(404).json({
                message: "Users not updated"
            }); res.sendStatus(204);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //metod DELETE
    deleteUser: async (req, res) => {

        try {
            const [result] = await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);

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

export default actionUsersController