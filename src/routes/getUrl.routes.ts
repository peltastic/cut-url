import express, { Request, Response } from "express";
import { findUrl, updateClicks } from "../services/urls.service";
const router = express.Router();

router.get("/:code", async (req: Request, res: Response) => {
    const {code} = req.params 
  try {
    const url: any = await findUrl(code);
    if (url) {
      await updateClicks(url.clicks, code);

      return res.redirect(url.url);
    } else {
      return res.status(404).json("No Url Found");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});

export default router;
