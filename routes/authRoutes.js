import express from 'express';
import rateLimit from 'express-rate-limit';
import { loginController, registerController } from '../controllers/authController.js';

// ip limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
})

// router object 
const router = express.Router();

// routes

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: Object
 *       required:
 *           - name
 *           - lastname
 *           - email
 *           - password
 *           - location
 *       properties:
 *         id:
 *           type: string
 *           description: The Auto-generated id of user-application
 *         name:
 *           type: string
 *           description: User name
 *         lastName:
 *           type: string
 *           description: User Last name
 *         email:
 *           type: string
 *           description: User email
 *         password:
 *           type: string
 *           description: User password
 *         location:
 *           type: string
 *           description: User Location city or country
 *       example:
 *         id: aadfwel8owrw4rjf
 *         name: testing
 *         lastName: test
 *         email: testing@gmail.com
 *         password: test@123
 *         location: mumbai
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: authentication apis
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: register new user
 *     tags: [Auth]
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *      responses:
 *       200:
 *          description: user created successfully
 *          content:
 *             application/json:
 *               schema:
 *                  $ref: '#/components/schemas/User'
 *       500:
 *          description: Internal server error
 */

// REGISTER || POST
router.post('/register', limiter, registerController)

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: login page
 *     tags: [Auth]
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *      responses:
 *       200:
 *          description: Successfully Login
 *          content:
 *             application/json:
 *               schema:
 *                  $ref: '#/components/schemas/User'
 *       500:
 *          description: Internal server error
 */

// LOGIN || POST
router.post('/login', limiter, loginController)

// export
export default router;