import express from "express";
import {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
} from "../../../controller/product/producttag/productTagController";

const router = express.Router();

router.post("/product-tag", createTag);
router.get("/product-tag", getAllTags);
router.get("/product-tag/:id", getTagById);
router.put("/product-tag/:id", updateTag);
router.delete("/product-tag/:id", deleteTag);

export default router;
