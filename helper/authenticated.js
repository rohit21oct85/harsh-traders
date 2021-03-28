import { verify } from 'jsonwebtoken';

const signature = process.env.signature;

export const authenticated = (fn) => async (req, res) => {
    verify(req.cookies.auth, signature, async function(err, decode){
        if(!err && decode){
            return await fn(req, res, decode);
        }
        return res.status(401).json({message: 'Sorry you are not authenticated'})
    })
}