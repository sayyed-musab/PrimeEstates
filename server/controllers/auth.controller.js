import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

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
