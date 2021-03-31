import { authenticated } from "../../../helper/authenticated";
import initDB from "../../../helper/initDB";
import Admin from "../../../models/admin/Admin";
import jwt from 'jsonwebtoken'

initDB();
export default authenticated(async function me(req, res, decode){
    const id =  decode.result._id;
    const projection = {__v: 0, password: 0}
    const data = await Admin.findOne({_id: id},projection);
    return res.status(200).json({
        error: false,
        data
    });
})