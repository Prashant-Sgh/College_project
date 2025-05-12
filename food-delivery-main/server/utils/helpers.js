import crypto from "node:crypto"
import { SALT_KEY } from '../config.js';

export function genHash(password, salt = SALT_KEY) {
    return crypto.createHash('sha256').update(password + salt).digest('hex');
}