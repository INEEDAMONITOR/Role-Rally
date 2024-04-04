import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { useUploadThing } from "@/app/_lib/uploadthing";
import { useCallback, useState } from "react";
import { Avatar, Spinner } from "flowbite-react";

interface Props {
  onClientUploadComplete?: (url: string) => void;
}

export default function ImageUploader(props: Props) {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setLoading(true);
    startUpload(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete: (res) => {
        if (res && res.length > 0) {
          setImage(res[0].url);
          props.onClientUploadComplete?.(res[0].url);
        }
        setLoading(false);
      },
      onUploadError: () => {
        console.error("error occurred while uploading");
        setLoading(true);
      },
      onUploadBegin: () => {
        console.log("upload begins");
        setLoading(true);
      }
    },
  );

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : ["PNG", "JPG", "JPEG"];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {loading ?
        <div className="w-40 h-full flex justify-center items-center">
          <Spinner
            color="purple"
            size="xl"
          />
        </div> :
        image ?
          <Avatar
            img={image}
            size="xl"
            className="w-40 cursor-pointer hover:opacity-70"
          /> :
          <div className="border border-dashed border-zinc-500 hover:border-zinc-300 rounded-2xl w-40 shrink-0 cursor-pointer px-4 py-6">
            <div className="text-center flex flex-col justify-center h-full">
              <svg
                className="mx-auto h-12 w-12 text-gray-500"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-xs font-bold leading-5 text-gray-100">
                Upload a picture
              </p>
              <p className="text-xs leading-5 text-gray-300">
                PNG, JPG and JPEG up to 4MB
              </p>
            </div>
          </div>
      }
    </div>
  );
}