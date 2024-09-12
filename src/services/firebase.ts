import { storage } from "@/config/firebaseAdmin";

import { GetSignedUrlResponse } from "@google-cloud/storage";

type TReturn = { ok: true; url: string };

export async function uploadImageToFirebase(
  image: File,
  folder: string,
): Promise<TReturn> {
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

const extractFilePathFromUrl = (
  url: string,
  path: "article" | "user",
): string => {
  // التحقق من وجود المسار المطلوب داخل الـ URL
  const index = url.indexOf(`/${path}/`);

  if (index === -1) throw new Error("Invalid Google Cloud Storage URL");

  // قطع الجزء الذي بعد المسار المحدد
  const urlWithoutQueryParams = url.split("?")[0]; // إزالة المعاملات إن وجدت
  let filePath = urlWithoutQueryParams.substring(index + 1); // استخراج المسار بعد "article" أو "user"

  // فك تشفير المسار ليصبح قابل للقراءة (تحويل %20 إلى مسافات وغيرها)
  filePath = decodeURIComponent(filePath);

  return filePath;
};

export async function deleteImageFromFirebase(
  url: string,
  path: "article" | "user",
): Promise<true> {
  try {
    const filePath = extractFilePathFromUrl(url, path);
    console.log("filePath ====>", filePath);

    const file = storage.file(filePath);

    const [exists] = await file.exists();

    if (!exists) throw new Error("File does not exist");
    await file.delete();
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
