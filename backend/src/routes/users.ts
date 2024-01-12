import express, {Request,Response} from 'express';
import User from '../models/user'
import jwt from 'jsonwebtoken'
import {check, validationResult} from 'express-validator'

const router = express.Router();
// REGISTER, MAIL STATUS | /api/users/register, при выполнении запроса check проверяет валидность всего UserType
router.post('/register', [
    check('firstName', 'First Name is required').isString(),
    check('lastName', 'Last Name is required').isString(),
    check('email', 'Email Name is required').isEmail(),
    check('password', 'Password with 6 or more characters required').isLength(
        {
        min:6
    }),
], async (req: Request, res: Response)=>{
    // проверка ошибок в результате, isEmpty() убирает пустоту
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({message: errors.array()})
    }
    try {
        let user = await User.findOne({
            email: req.body.email,
        });

        if(user) {
            return res.status(400).json({message: 'User already'});
        }
        user = new User(req.body);
        await user.save();
        // TOKEN
        const token = jwt.sign(
            {userId: user.id}, 
            process.env.JWT_SECRET_KEY as string,
            {
                expiresIn: '1day',
            }
            );
            // response cookie
            res.cookie('auth_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 86400000,
            });
            return res.status(200).send({ message: 'Ok'})
} catch (error) {
        console.log(error);
        res.status(500).send({message: 'Something went wrong'})
    }
})

export default router;