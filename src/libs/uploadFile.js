import { s3Client } from "@/utils/aws";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadFile({ key, folder, body }) {
  const bytes = await body.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    const fileUpload = await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKETNAME,
        Key: `${folder}/${key}`,
        ContentType: body.type,
        Body: buffer,
      })
    );
    console.log(fileUpload, "Upload success");
  } catch (error) {
    console.log(error);
  }
}
