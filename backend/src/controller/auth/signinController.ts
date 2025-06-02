
import { prisma } from "../../db/prisma";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { uploadFile } from "../../config/upload";

// Signup controller
export const signupController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password, role } = req.body;
    const profilePictureFile = req.file;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }

    // Upload profile picture if provided
    let url: string | undefined = undefined;
    if (profilePictureFile && profilePictureFile.buffer) {
      const uploadResult = await uploadFile(profilePictureFile.buffer, "profile_pics", "image");
      url = uploadResult.url;
    }


    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });


    if (existingUser) {
      return res.status(409).json({ error: "User already exists." });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user with hashed password
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        role,
        profilePicture: url,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: "User created successfully.", userId: newUser.id });
  } catch (error) {
    console.error("Error in signup:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// Signin controller using localstorage session for 7 Days and Password compare

// SIGNIN CONTROLLER FIXED ✅
export const signinController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // ✅ FIXED: Use `id` instead of `userId`
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '30d' }
    );

    return res.status(200).json({
      message: "Signin successful.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role, // Include role if needed
        isActive: user.isActive, // Include isActive status
      },
    });
  } catch (error) {
    console.error("Error in signin:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
