import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username: username.trim(),
    email: email.trim(),
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    if (error.code == 11000) {
      if (error.keyPattern.email) {
        next({ message: "User with this email already registered" });
      } else if (error.keyPattern.username) {
        next({ message: "User with this username already registered" });
      }
    } else {
      next(error);
    }
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "Wrong credentials!"));
    }
    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(404, "Wrong credentials!"));
    }

    const token = jwt.sign(
      { id: validPassword._id },
      process.env.JWT_SECRET_KEY
    );

    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ validUser: { ...rest } });
  } catch (error) {
    next(error);
  }
};
