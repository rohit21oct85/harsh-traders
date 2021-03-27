import connectDB from '../../../../middleware/mongodb';
import Admin from '../../../../models/admin/Admin.js';

const handler = async (req, res) => {
    if(req.method === 'POST'){
        const {name, email, password} = req.body;
        if(name && email && password){
            var newAdmin = new Admin({
                name,
                email,
                password
            });
            // Create new user
            var admincreated = await newAdmin.save();
            res.status(200).json(admincreated);
        }else{
            res.status(422).send('data incomplete');
        }

    }else{
        res.status(422).json({message: 'req_method_not_supported'});
    }
}

export default connectDB(handler);