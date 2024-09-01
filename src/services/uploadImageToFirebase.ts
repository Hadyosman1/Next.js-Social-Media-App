import { storage } from "@/config/firebaseAdmin";
import { GetSignedUrlResponse } from "@google-cloud/storage";

type TReturn = { ok: boolean; url: string } | Error;

export default async function (image: File, folder: string) {
  try {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${folder}/${Date.now()}-${image.name}`;
    const file = storage.file(fileName);

    await file.save(buffer, {
      metadata: {
        contentType: image.type,
        cacheControl: "public, max-age=31536000",
      },
    });

    const signedUrlResponse: GetSignedUrlResponse = await file.getSignedUrl({
      action: "read",
      expires: "01-01-2070",
    });

    const url: string = signedUrlResponse[0];

    return {
      ok: true,
      url,
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}
