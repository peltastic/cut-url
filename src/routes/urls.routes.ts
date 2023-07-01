import express, { Request, Response } from "express";
import { authorize } from "../middleware/authorizeUser";
import shortid from "shortid";
import validUrl from "valid-url";
import config from "config";
import { IAddUserToRequest } from "../interfaces/request.interface";
import {
  createShortenedUrl,
  findAllUserUrls,
  findUrl,
} from "../services/urls.service";
const router = express.Router();



router.get("/user/urls", authorize, async (req: Request, res: Response) => {
  const user_id = (req as IAddUserToRequest).user?.user_id as string;
  try {
    const urls: any = await findAllUserUrls(user_id);
    return res.status(200).json(urls);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/shorten-url", authorize, async (req: Request, res: Response) => {
  const { url } = req.body;
  const user_id = (req as IAddUserToRequest).user?.user_id as string;

  if (!validUrl.isUri(url)) {
    return res.status(401).json({
      message: "Invalid Url",
      success: false,
    });
  }
  try {
    const urlData: any = await findUrl(user_id);

    if (url === urlData?.url) {
      return res.status(200).json({
        success: true,
        url: urlData?.shortened_url,
      });
    }

    const shortenedUrlCode = shortid.generate();

    const shortenedUrl = `${config.get("BASE_URL")}/${shortenedUrlCode}`;
    await createShortenedUrl({
      code: shortenedUrlCode,
      shortened_url: shortenedUrl,
      user_id,
      url,
    });
    return res.status(200).json({
      success: true,
      url: shortenedUrl,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal Server Error");
  }
});

export default router;
