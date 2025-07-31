import { Router } from "express";
import {
  getCustomers,
  postCustomer,
  deleteCustomer,
  postCustomerNote,
  deleteCustomerNote,
} from "../controllers/customer";

const customerRouter = Router();

/**
 * @route   GET /customers
 * @desc    Retrieve a list of all customers
 * @access  private
 */
customerRouter.get("/", getCustomers);

/**
 * @route   POST /customers
 * @desc    Create a new customer or update an existing one
 * @access  private
 */
customerRouter.post("/", postCustomer);

/**
 * @route   DELETE /customers/:id
 * @desc    Delete a customer by ID
 * @access  private
 */
customerRouter.delete("/:id", deleteCustomer);

/**
 * @route   POST /customers/:id/note
 * @desc    Post a customer note by ID
 * @access  private
 */
customerRouter.post("/:id/note", postCustomerNote);

/**
 * @route   DELETE /customers/:id/note
 * @desc    Delete a customer's note by ID
 * @access  private
 */
customerRouter.delete("/:id/note", deleteCustomerNote);

export default customerRouter;
