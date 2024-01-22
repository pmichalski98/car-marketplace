import { randomUUID } from "node:crypto"
import { S3 } from "aws-sdk"

export async function addImagesToS3(images: File[]) {
   const s3 = new S3({
      credentials: {
         accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
      region: "eu-north-1",
   })
   return Promise.all(
      images?.map(async (imageFile) => {
         const imageId = randomUUID()
         const arrayBuffer = await imageFile.arrayBuffer()
         const buffer = Buffer.from(arrayBuffer)
         await s3
            .putObject({
               Body: buffer,
               Bucket: process.env.AWS_S3_BUCKET_NAME!,
               Key: imageId,
               ContentType: "image/gif",
            })
            .promise()
         return imageId
      })
   )
}
