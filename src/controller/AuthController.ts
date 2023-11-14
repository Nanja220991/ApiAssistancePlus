import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from '../entity/User';

const authRouter = Router();

authRouter.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ username });

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    if (user.statut == '0') {
        return res.status(401).json({ message: 'Compte inactif' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user.id, userName: user.username, role: user.role, docId: user.token }, '3QwPqL20WzOEq9wG3qchq46kMEGDE9ob', {
        expiresIn: '1h',
    });

    res.json({ token });
});

authRouter.post('/signup', async (req: Request, res: Response) => {
    const { username, statut, app, password } = req.body;
    const userRepository = getRepository(User);

    const existingUser = await userRepository.findOne({ username });

    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = userRepository.create({
        username,
        app,
        statut,
        password: hashedPassword,
    });

    await userRepository.save(newUser);

    res.status(201).json({ message: 'User registered successfully' });
});

export default authRouter;
