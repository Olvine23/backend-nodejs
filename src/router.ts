import { Router } from "express";
import { body, check, oneOf, validationResult } from "express-validator";
import { inputValidation } from "./modules/middlewares";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update";

const router = Router();

// products
router.get("/product", getProducts);

router.get("/product/:id", getOneProduct);

router.put(
  "/product/:id",
  body("name").isString(),
  inputValidation,
  (req, res) => {}
);

//create a product

router.post(
  "/product",
  body("name").isString(),
  inputValidation,
  createProduct
);

//delete a product

router.delete("/product/:id", deleteProduct);

//updates

router.get(
  "/update",

  getUpdates
);

router.get("/update/:id", getOneUpdate);

router.put(
  "/update/:id",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  // oneOf([
  //   check("status").equals("IN_PROGRESS"),
  //   check("status").equals("SHIPPED"),
  //   check("status").equals("DEPRECATED"),
  // ]),
  // body("version").optional,
  updateUpdate
);

router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  // oneOf([
  //   check("status").equals("IN_PROGRESS"),
  //   check("status").equals("SHIPPED"),
  //   check("status").equals("DEPRECATED"),
  // ]),
  // body("version").optional,
  createUpdate
);

router.delete("/update", deleteUpdate);

//updatepoints

router.get("/updatepoint", () => {});

router.get("/updatepoint/:id", () => {});

router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  () => {}
);

router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString(),
  () => {}
);

router.delete("/updatepoint", () => {});

export default router;
