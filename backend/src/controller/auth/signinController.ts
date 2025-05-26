import express from 'express';
import { prisma } from '../../db/prisma';
import {Request, Response} from 'express';
import bcrypt from 'bcrypt';


// Signup controller
export const signupController = async (req: Request, res: Response):Promise<any> => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists.' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user with hashed password
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: 'User created successfully.', userId: newUser.id });
  } catch (error) {
    console.error('Error in signup:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

// Signin controller using localstorage session for 7 Days and Password compare
export const signinController = async (req: Request, res: Response):Promise<any> => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Send minimal user data back
    return res.status(200).json({
      message: 'Signin successful.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error in signin:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};
