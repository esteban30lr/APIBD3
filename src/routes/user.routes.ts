import {Request, Response, Router} from 'express';
import User from '../models/user';

class userRouter{
    router: Router;

    constructor(){
        this.router = Router();
        this.routesUser();
    }

    async getUser(req:Request, res:Response):Promise<any>{
        const users = await User.find();
        return res.json({code:200,user: users});
    }

    async postUser(req:Request, res:Response):Promise<any>{
        console.log(req.body);
        const users = new User(req.body);
        await users.save();
        return res.json({code:200,user: users});
    }


    routesUser(){

        this.router.get('/getUsers', this.getUser);
        this.router.post('/postUser',this.postUser);
    }


}

const user = new userRouter();
export default user.router;