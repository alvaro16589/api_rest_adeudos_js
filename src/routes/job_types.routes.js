import { Router } from "express";
import actionJobTypesController from "../controller/job_types.controller.js";


const router = Router();
const roat = {
    def : "/jobtypes",
    defID : "/jobtypes/:id"
}

router.get(roat.def,actionJobTypesController.getJobTypes);
router.get(roat.defID,actionJobTypesController.getOneJobTypes);
router.post(roat.def,actionJobTypesController.createJobTypes);
router.patch(roat.defID,actionJobTypesController.updateJobTypes);
router.delete(roat.defID,actionJobTypesController.deleteJobTypes);

export default router