import bcrypt  from 'bcryptjs';
import express, {Request,Response} from "express"
import { check, validationResult } from "express-validator"
import User from "../models/user"
import jwt  from 'jsonwebtoken';
import verifiyToken from '../middleware/auth';

const router = express.Router()
// routing, checked email,pass
router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password with 6 or more characters required').isLength({
            min: 6,
        }),
], async (req: Request, res: Response)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({message:errors.array()})
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
        if(!user) {
            return res.status(400).json({message: 'Error,invalid cred'})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: 'Error,invalid cred'})
        }
        // JSON WEB TOKEN
        const token = jwt.sign(
            {userId: user.id}, 
            process.env.JWT_SECRET_KEY as string,
            {
                expiresIn: '1d',
            }
            );
            // cookie 
            res.cookie('auth_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 86400000, // ms not seconds
            });
            res.status(200).json({userId: user._id})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong'})
    }
});

router.get('/validate-token', verifiyToken, (req: Request, res: Response) => {
    res.status(200).send({userId: req.userId});
})
// logout
router.post('/logout', (req: Request, res: Response) => {
    res.cookie('auth_token', '', {
        expires: new Date(0) // время сколько будет действовать token
    });
    res.send();
})

export default router;