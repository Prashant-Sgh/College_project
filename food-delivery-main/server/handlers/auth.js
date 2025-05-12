
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';
import { genHash } from '../utils/helpers.js';
import { Restaurant } from "../models/restaurant.js"




/**
 * @description authorise restaurant based on request cookie jwt token or header authorization jwt token
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export async function authentication(req, res) {
    try {
        // Check for token in cookies first
        let token = req.cookies.token;

        // If no token in cookies, check Authorization header
        if (!token) {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ error: 'No authentication token provided' });
            }
            token = authHeader.split(' ')[1];
        }

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Add user data to request object
        req.user = decoded;

        return res.status(200).json({ ...decoded });
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
}





/**
 * @description login user with given email and password
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export async function login(req, res) {
    const { email, pass } = req.body;

    if (!email || !pass) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    // check if resta exists
    const resta = await Restaurant.findOne({ email });
    if (!resta) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    // check if password is correct
    console.log(resta.pass, pass, genHash(pass))
    if ((resta.pass != pass) && (resta.pass !== genHash(pass))) {
        return res.status(401).json({ error: 'Invalid password' });
    }

    // generate jwt token
    const token = jwt.sign({ name: resta.name, _id: resta._id }, JWT_SECRET, { expiresIn: '1d' });

    // set token in cookies
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
    return res.status(200).json({ message: 'Login successful' });
}





/**
 * @description logout user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function logout(req, res) {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logout successful' });
}



/**
 * @description signup user with given email, password and name
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function signup(req, res) {
    try {
        const { email, pass, name, owner } = req.body;
        if (!email || !pass || !name || !owner) {
            return res.status(400).json({ error: 'Email, password , name and owner name  are required properties' });
        }
        const ExistingRestaurant = await Restaurant.findOne({ email })
        console.log(ExistingRestaurant?.name)
        if (ExistingRestaurant) {
            return res.status(400).json({ error: 'Restaurant already exists' });
        }
        const new_Restaurant = new Restaurant({ email, pass, name, owner })
        new_Restaurant.save()
        const token = jwt.sign({
            _id: new_Restaurant._id,
            name: new_Restaurant.name,
            owner: new_Restaurant.owner,
        }, JWT_SECRET, { expiresIn: '1d' });

        // set token in cookies
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
        return res.status(200).json({ message: 'Restaurant created successfully' });
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' });
    }
}