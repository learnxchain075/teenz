import express from "express";
import { createAddress, getAllAddresses, getAddressById, updateAddress, deleteAddress } from "../../controller/address/createAddress";


const router = express.Router();

router.post("/address", createAddress);
router.get("/addresses", getAllAddresses);
router.get("/address/:id", getAddressById);
router.put("/address/:id", updateAddress);
router.delete("/address/:id", deleteAddress);

export default router;