import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, role } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'El usuario ya existe' });
      return;
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const user = new User({
      email,
      password: hashedPassword,
      name,
      role: role || 'editor'
    });

    await user.save();

    res.status(201).json({ message: 'Usuario creado exitosamente', userId: user._id });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error al crear usuario' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Credenciales inválidas' });
      return;
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ message: 'Credenciales inválidas' });
      return;
    }

    // Generar token
    const secret: Secret = process.env.JWT_SECRET || 'secret';
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      secret,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?.id).select('-password');
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }
    res.json(user);
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    res.status(500).json({ message: 'Error al obtener información del usuario' });
  }
};
