import { Router } from "express";
import actionTypeUsersController from "../controller/type_users.controller.js";


const router = Router();
const roat = {
    def : "/typeUsers",
    defID : "/typeUsers/:id"
}

router.get(roat.def,actionTypeUsersController.getTypeUsers);
router.get(roat.defID,actionTypeUsersController.getOneTypeUsers);
router.post(roat.def,actionTypeUsersController.createTypeUsers);
router.patch(roat.defID,actionTypeUsersController.updateTypeUsers);
router.delete(roat.defID,actionTypeUsersController.deleteTypeUsers);

export default router