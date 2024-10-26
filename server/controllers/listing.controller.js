import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
  try {
    const {
      name,
      description,
      address,
      regularPrice,
      discountPrice,
      bathrooms,
      bedrooms,
      furnished,
      parking,
      type,
      offer,
      imageUrls,
    } = req.body;
    const listing = await Listing.create({
      name,
      description,
      address,
      regularPrice,
      discountPrice,
      bathrooms,
      bedrooms,
      furnished,
      parking,
      type,
      offer,
      imageUrls,
      userRef: req.user.id,
    });
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};
