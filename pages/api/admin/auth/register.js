import initDB from '../../../../helper/initDB';
import Admin from '../../../../models/admin/Admin.js';

initDB()

export  default async (req, res) => {
    if(req.method === 'POST'){
        try {
            const {name, email, password} = req.body;
            const filter = {name: name, email: email}
            const update = {name: name, email:email, password: password}
            const option = {new: true, upsert: true}
            if(name && email && password){
                let newAdmin = await Admin.findOneAndUpdate(filter,update, option);
                return res.status(200).json({
                    error: false,
                    message: 'Admin Created',
                    data: newAdmin
                });
            }else{
                return res.status(422).json({
                    error: true,
                    message: 'Data incomplete'
                });
            }
        } catch (error) {
            return res.status(422).json({
                error: true,
                message: error
            })
        }

    }else{
        return res.status(422).json({message: `${req.method} Type Not Supported`});
    }
}