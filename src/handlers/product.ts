import { body } from "express-validator";
import prisma from "../db";

//get all products
export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      Product: true,
    },
  });

  res.json({ data: user.Product });
};

//get one product
export const getOneProduct = async (req, res) => {
  const id = req.params.id;

  const product = await prisma.product.findFirst({
    where: {
      id,
      belongsToId: req.user.id,
    },
  });

  res.json({

    data:product

  })
};
//create a product
export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        productDescription: req.body.productDescription,
        belongsToId: req.user.id,
      },
    });
    res.json({ data: product });
    
  } catch (error) {
    next(error)
    
  }
 
};
 
//update a product 
export const updateProduct = async (req, res) => {
  const updated = await prisma.product.update({
    where: {
      id: req.params.id,
      belongsToId: req.user.id
    },
    data: {
      name: req.body.name,
      productDescription: req.body.productDescription
    },
  });

  res.json({ data: updated });
};

//delete a product

export const deleteProduct = async (req, res) => {
  const deleted = await prisma.product.delete({
    where: {
     id_belongsToId: {
        id:req.params.id,
        belongsToId:req.user.id
     }
    },
  });
  res.json({date:deleted})
};
