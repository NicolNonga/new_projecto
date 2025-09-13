import express, { Router } from "express";
import { PrismaDespachanteRepository } from "../../../infrastructure/database/PrismaDespachanteRepository";
import { GetDespachanteService } from "../../../application/services/despachante/GetDespachanteService";

import { DespachanteControllers } from "../../controllers/despachante/DespachanteControllers";

const despachanteRepo = new PrismaDespachanteRepository();
const getDespachanteService = new GetDespachanteService(despachanteRepo);
const despachanteControllers = new DespachanteControllers(getDespachanteService);

const DespachanteRoute = Router();

DespachanteRoute.get("/all/:CEDULA/:NIF", (req, res) => despachanteControllers.getDespachante(req, res));

export { DespachanteRoute };