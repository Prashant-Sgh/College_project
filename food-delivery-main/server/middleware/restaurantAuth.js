


import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

/**
 * Middleware to authenticate restaurant access
 * Verifies JWT token from cookies or Authorization header
 * Attaches decoded user data to request object if authenticated
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
export function restaurantAuth(req, res, next) {
    try {
        // Check for token in cookies first
        let token = req.cookies.token;

        // If no token in cookies, check Authorization header
        if (!token) {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ error: 'Authentication required' });
            }
            token = authHeader.split(' ')[1];
        }

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Add user data to request object
        req.user = decoded;

        // Continue to next middleware/route handler
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: 'Invalid authentication token' });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
}