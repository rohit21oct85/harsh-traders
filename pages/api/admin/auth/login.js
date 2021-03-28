import initDB from '../../../../helper/initDB';
import Admin from '../../../../models/admin/Admin.js';
import bcrypt from 'bcrypt';
import {sign} from 'jsonwebtoken'
import cookie from 'cookie'
initDB()

export default async (req, res) => {
    if(req.method === 'POST'){
        const {email, password} = req.body;
        const filter = {email: email}
        const projection = {email: 1, password: 1}
        let result = await Admin.findOne(filter,projection);
        if(result && result.email === email){
            bcrypt.compare(password,result.password, async (err, response) => {
                if(!err && response){
                    const jwt = await generateAccessToken({result: result});
                    res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
                        httpOnly: true,
                        sameSite: 'strict',
                        secure: process.env.NODE_ENV !== 'development',
                        maxAge: 3600,
                        path: '/'
                    }))
                    return res.status(200).json({
                        error: false,
                        message: 'Login successfully'
                    });
                }else{
                    return res.status(203).json({
                        error: true,
                        message: 'Wrong password provided'
                    });        
                }
            })

        }else{
            return res.status(203).json({
                error: true,
                message: 'Wrong email provided'
            });    
        }
    }else{
        return res.status(203).json({message: `${req.method} Type Not Supported`});
    }
}

const generateAccessToken = async (user) => {
    const accessTokenSecret = process.env.signature;
    return sign(user, accessTokenSecret, {expiresIn: '1hr'})
}