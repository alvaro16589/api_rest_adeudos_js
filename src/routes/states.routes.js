import { Router } from "express";
import actionStatesController from "../controller/states.controller.js";


const router = Router();
const roat = {
    def : "/states",
    defID : "/states/:id"
}

router.get(roat.def,actionStatesController.getStates);
router.get(roat.defID,actionStatesController.getOneStates);
router.post(roat.def,actionStatesController.createStates);
router.patch(roat.defID,actionStatesController.updateStates);
router.delete(roat.defID,actionStatesController.deleteStates);

export default router