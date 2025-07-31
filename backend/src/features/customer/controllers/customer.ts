import { Request, Response } from "express";
import CustomerModel from "@/features/customer/models/customer-model";
import { HTTP_CODE } from "@/http/constants";
import { isValidLength } from "@/helpers/functions/is-valid-length";
import {
  isNull,
  isString,
  isUndefined,
} from "@/helpers/functions/type-validation";
import { castToObjectId } from "@/helpers";
import { CUSTOMER_MESSAGES, GENERAL_MESSAGES } from "@/constants/messages";
import { isValidObjectId } from "mongoose";

export const postCustomer = async (req: Request, res: Response) => {
  try {
    let { _id, name, email, phone, tag } = req.body;

    if (
      !isString(name) ||
      !isString(email) ||
      !isString(phone) ||
      !isString(tag)
    ) {
      return res.status(HTTP_CODE.BAD_REQUEST).json({
        message: CUSTOMER_MESSAGES.MISSING_FIELDS,
      });
    }

    if (!name || !isValidLength(name, 2, 30)) {
      return res.status(HTTP_CODE.BAD_REQUEST).json({
        message: CUSTOMER_MESSAGES.INVALID_NAME,
      });
    }

    email = email.trim().toLowerCase();
    phone = phone.trim();
    tag = tag.trim();

    if (_id) {
      if (!isValidObjectId(_id)) {
        return res.status(HTTP_CODE.BAD_REQUEST).json({
          message: CUSTOMER_MESSAGES.CUSTOMER_NOT_FOUND,
        });
      }

      const existing = await CustomerModel.findById(castToObjectId(_id)).exec();

      if (!existing) {
        return res.status(HTTP_CODE.NOT_FOUND).json({
          message: CUSTOMER_MESSAGES.CUSTOMER_NOT_FOUND,
        });
      }

      if (existing.email !== email) {
        const emailTaken = await CustomerModel.findOne({ email }).exec();
        if (emailTaken) {
          return res.status(HTTP_CODE.CONFLICT).json({
            message: CUSTOMER_MESSAGES.CUSTOMER_EMAIL_EXIST,
          });
        }
        existing.email = email;
      }

      existing.name = name;
      existing.phone = phone;
      existing.tag = tag;

      await existing.save();

      return res.status(HTTP_CODE.OK).json({
        message: CUSTOMER_MESSAGES.CUSTOMER_UPDATE_SUCCESS,
        data: existing,
      });
    } else {
      const emailTaken = await CustomerModel.findOne({ email }).exec();
      if (emailTaken) {
        return res.status(HTTP_CODE.CONFLICT).json({
          message: CUSTOMER_MESSAGES.CUSTOMER_EMAIL_EXIST,
        });
      }

      const newCustomer = new CustomerModel({
        name,
        email,
        phone,
        tag,
      });

      await newCustomer.save();

      return res.status(HTTP_CODE.CREATED).json({
        message: CUSTOMER_MESSAGES.CUSTOMER_CREATED,
        data: newCustomer,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).json({
      message: CUSTOMER_MESSAGES.SERVER_ERROR,
    });
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const customerId = req.params.id;

    const deleted = await CustomerModel.findByIdAndDelete(customerId).exec();

    if (!deleted) {
      return res
        .status(HTTP_CODE.NOT_FOUND)
        .json({ message: CUSTOMER_MESSAGES.CUSTOMER_NOT_FOUND });
    }

    res
      .status(HTTP_CODE.OK)
      .json({ message: CUSTOMER_MESSAGES.CUSTOMER_DELETED });
  } catch (error) {
    console.error(error);
    res
      .status(HTTP_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: CUSTOMER_MESSAGES.SERVER_ERROR });
  }
};

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await CustomerModel.find().exec();

    res.status(HTTP_CODE.OK).json({
      data: customers,
    });
  } catch (error) {
    console.error(error);
    res
      .status(HTTP_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: GENERAL_MESSAGES.SERVER_ERROR });
  }
};

export const postCustomerNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let { note, date } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(HTTP_CODE.BAD_REQUEST).json({
        message: CUSTOMER_MESSAGES.CUSTOMER_NOT_FOUND,
      });
    }

    if (
      (isUndefined(note) || isNull(note)) &&
      (isUndefined(date) || isNull(date))
    ) {
      return res.status(HTTP_CODE.BAD_REQUEST).json({
        message: CUSTOMER_MESSAGES.MISSING_FIELDS,
      });
    }

    if (isUndefined(!note) && isNull(!note)) {
      if (
        !isString(note) ||
        note.trim() === "" ||
        !isValidLength(note.trim(), 1, 500)
      ) {
        return res.status(HTTP_CODE.BAD_REQUEST).json({
          message: CUSTOMER_MESSAGES.MISSING_FIELDS,
        });
      }
      note = note.trim();
    }

    if (!isUndefined(date) && !isNull(date)) {
      date = new Date(date);
      if (isNaN(date.getTime())) {
        return res.status(HTTP_CODE.BAD_REQUEST).json({
          message: CUSTOMER_MESSAGES.CUSTOMER_INVALID_NOTE_DATE,
        });
      }
    } else {
      date = null;
    }

    const existing = await CustomerModel.findById(castToObjectId(id)).exec();

    if (!existing) {
      return res.status(HTTP_CODE.NOT_FOUND).json({
        message: CUSTOMER_MESSAGES.CUSTOMER_NOT_FOUND,
      });
    }

    if (!isUndefined(note) && !isNull(note)) {
      existing.note = note;
    }

    if (!isUndefined(date)) {
      existing.date = date;
    }

    await existing.save();

    return res.status(HTTP_CODE.OK).json({
      message: CUSTOMER_MESSAGES.CUSTOMER_UPDATE_SUCCESS,
    });
  } catch (error) {
    console.error(error);
    return res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).json({
      message: GENERAL_MESSAGES.SERVER_ERROR,
    });
  }
};

export const deleteCustomerNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(HTTP_CODE.BAD_REQUEST).json({
        message: CUSTOMER_MESSAGES.CUSTOMER_NOT_FOUND,
      });
    }

    const existing = await CustomerModel.findById(castToObjectId(id)).exec();

    if (!existing) {
      return res.status(HTTP_CODE.NOT_FOUND).json({
        message: CUSTOMER_MESSAGES.CUSTOMER_NOT_FOUND,
      });
    }

    existing.note = null;
    existing.date = null;

    await existing.save();

    return res.status(HTTP_CODE.OK).json({
      message: CUSTOMER_MESSAGES.CUSTOMER_NOTE_DELETED,
    });
  } catch (error) {
    console.error(error);
    return res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).json({
      message: GENERAL_MESSAGES.SERVER_ERROR,
    });
  }
};
