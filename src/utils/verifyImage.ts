export default function verifyImage (
  file: File,
): { message: string; status: number } | "valid" {
  const isImage = file.type.startsWith("image");
  if (!isImage) {
    return {
      message: "Invalid file type. Only images are allowed.",
      status: 400,
    };
  }

  if (file.type.includes("svg")) {
    return {
      message: "SVG files are not supported.",
      status: 400,
    };
  }

  const sizeInMB = file.size / (1024 * 1024);
  if (sizeInMB > 4) {
    return {
      message: "File size is too large. Maximum allowed size is 4MB.",
      status: 400,
    };
  }

  return "valid";
}
