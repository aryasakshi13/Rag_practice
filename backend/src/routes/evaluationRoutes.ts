import { Router } from "express";
import { evaluationApi } from "../controller/evaluationController.js";

const router = Router();

router.post("/evaluation", evaluationApi);

export default router;