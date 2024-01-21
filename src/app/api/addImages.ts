import { randomUUID } from "node:crypto"
import { S3 } from "aws-sdk"

async function addImage(formData: FormData) {
   "use server"
   const images: File[] | null = formData.get("file") as unknown as File[]
   console.log(images)
   const s3 = new S3({
      credentials: {
         accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
      region: "eu-north-1",
   })
   const imageId = randomUUID()
   const s3Promises = images?.map(async (imageFile) => {
      const buffer = await imageFile.arrayBuffer()
      const fileBlob = Buffer.from(buffer)
      return s3.putObject({
         Body: fileBlob,
         Bucket: process.env.AWS_S3_BUCKET_NAME!,
         Key: imageId,
         ContentType: "image/gif",
      })
   })

   await Promise.all(
      images?.map(async (imageFile) => {
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
      })
   )
}
