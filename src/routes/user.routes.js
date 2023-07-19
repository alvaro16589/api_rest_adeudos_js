import { Router } from "express";
import actionUsersController from "../controller/user.controller.js";


const router = Router();
const roat = {
    def : "/users",
    defID : "/users/:id",
    defName : "/users/:nameac/:password"
}

router.get(roat.def,actionUsersController.getUsers);
router.get(roat.defName,actionUsersController.getOneUser);
router.post(roat.def,actionUsersController.createUser);
router.patch(roat.defID,actionUsersController.updateUser);
router.delete(roat.defID,actionUsersController.deleteUser);

export default router