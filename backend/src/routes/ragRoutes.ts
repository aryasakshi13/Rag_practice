import { Router } from "express";
import { ragApi } from "../controller/ragController.js";


const router = Router();

router.post("/chat" , ragApi);

export default  router ;