import UrlModel from "../models/urls.model";

interface ICreateShortenedUrlBody {
  url: string;
  shortened_url: string;
  user_id: string;
  code: string;
}

export async function createShortenedUrl(body: ICreateShortenedUrlBody) {
  await UrlModel.create(body);
}

export async function findUrl(code: string) {
  const urlData = await UrlModel.findOne({
    code
  });
  return urlData;
}

export async function findAllUserUrls(user_id: string) {
  const urls = await UrlModel.find({
    user_id,
  });

  return urls;
}

export const updateClicks = async (clickCount: number,  code: string) => {
  await UrlModel.updateOne(
    { code },
    {
      clicks: clickCount + 1,
    }
  );
};
