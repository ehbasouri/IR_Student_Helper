import express, {Express, Request, Response} from "express";

const app : Express = express();

app.get("/", (req: Request, res: Response)=>{
    res.send("Hello")
})

app.listen(4000, ()=>{
    console.log("server is listening on 4000");
})
