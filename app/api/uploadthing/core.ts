import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { userAuthenticate } from "@/app/api/_middleware/user";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = await userAuthenticate(req);

      if (!user) throw new UploadThingError("Unauthorized");

      return {
        userId: user._id,
      };
    })
    .onUploadComplete(async res => {
      return { url: res.file.url, uploadedBy: res.metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
