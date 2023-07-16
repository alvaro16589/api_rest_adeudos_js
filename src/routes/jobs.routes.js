import { Router } from "express";
import actionJobsController from "../controller/jobs.controller.js";


const router = Router();
const roat = {
    def : "/jobs",
    defID : "/jobs/:id"
}

router.get(roat.def,actionJobsController.getJobs);
router.get(roat.defID,actionJobsController.getOneJob);
router.post(roat.def,actionJobsController.createJob);
router.patch(roat.defID,actionJobsController.updateJob);
router.delete(roat.defID,actionJobsController.deleteJob);

export default router