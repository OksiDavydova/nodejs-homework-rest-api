const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { randomUUID } = require("crypto");
const { Role } = require("../../utils");

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: "user",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).trim().toLowerCase());
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    subscription: {
      type: String,
      enum: {
        values: Object.values(Role),
        message: "Role in not allowed",
      },
      default: Role.STARTER,
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: "250" }, true);
      },
    },
    idAvatarCloud: {
      type: String,
      default: null,
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: randomUUID(),
      required: [true, "Verify token is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(6);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.isValidPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);

module.exports = User;
