import User from "../../../model/users";
import { helpers } from "../../../helpers/index.js";
import bcrypt from "bcrypt";

export default {
  users: async () => await User.find(),
  authUser: async ({ user }, ctx, info) => {
    const { email, password } = user;

    const userRegistered = await User.findOne({ email });

    if (!userRegistered) {
      throw new Error("User does not exist!");
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userRegistered.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Wrong password, try again!");
    }

    return {
      token: helpers.tokenHelpers.createToken(
        userRegistered,
        process.env.SECRET,
        "12hr"
      ),
    };
  },
  createUser: async ({ user }, ctx, info) => {
    const { email, password } = user;

    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new Error("User already exists");
    }

    try {
      if (!user.rol_id) {
        user.rol_id = 5;
      }
      if (user.rol_id < 4) {
        user.discountCode = helpers.discountHelpers.generateUniqueCode();
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      const newUser = new User(user);
      return newUser.save();
    } catch (error) {
      console.log(error);
    }
  },
  updateUser: async ({ user }, ctx, info) => {
    const { _id } = user;

    const userExists = await User.findOne({ _id });

    if (!userExists) {
      throw new Error("User does not exists");
    }

    try {
      return await User.findOneAndUpdate({ _id }, user, { new: true });
    } catch (error) {
      console.log(error);
    }
  },
  deleteUser: async ({ user }, ctx, info) => {
    const { _id } = user;

    const userExists = await User.findOne({ _id });

    if (!userExists) {
      throw new Error("User does not exists");
    }

    try {
      await User.findOneAndRemove({ _id }, user);
      return "User removed";
    } catch (error) {
      console.log(error);
    }
  },
};
