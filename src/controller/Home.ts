import {Request, Response} from "express";
export const showHomePage = async(req: Request, res: Response) => {  
    res.send("API ASSISTANCE +");
}
