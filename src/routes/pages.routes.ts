import express, {Request, Response} from "express"

const router = express.Router()

router.get("/home", (req:Request, res: Response) => {
    return res.render("index")
})

router.get("/signup", (req: Request, res: Response) => {
    return res.render("signup")
})
router.get("/login", (req: Request, res: Response) => {
    return res.render("login")
})
router.get("/dashboard", (req: Request, res: Response) => {
    return res.render("dashboard")
})


export default router