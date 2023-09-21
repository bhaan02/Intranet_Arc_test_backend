import { Router } from "express";
import { deleteReserveHour, deleteResource, getResource, postReserveHour, postResource, putReserveHour, putResource } from "../controllers/resource.controller.js";

const router = Router(); 

router.get('/resource', getResource)

router.post('/resource', postResource)

router.post('/resource/reserveHour', postReserveHour)

router.put('/resource/:id', putResource)

router.put('/resource/reserveHour/:id', putReserveHour)

router.delete('/resource/:id', deleteResource)

router.delete('/resource/reserveHour/:id', deleteReserveHour)

export default router;