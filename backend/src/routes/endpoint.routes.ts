import { Router } from "express";
import * as endpointController from "@/controllers/endpoint.controller";
import { validate } from "@/middlewares/validate.middleware";
import {
  createEndpointSchema,
  updateEndpointSchema,
  endpointParamsSchema,
} from "@/validators/endpoint.validator";

const router = Router({ mergeParams: true });

router.post(
  "/",
  validate(createEndpointSchema),
  endpointController.createEndpoint,
);

router.get("/", endpointController.listEndpoints);

router.get(
  "/:endpointId",
  validate(endpointParamsSchema),
  endpointController.getEndpoint,
);

router.patch(
  "/:endpointId",
  validate(updateEndpointSchema),
  endpointController.updateEndpoint,
);

router.delete(
  "/:endpointId",
  validate(endpointParamsSchema),
  endpointController.deleteEndpoint,
);

export default router;
