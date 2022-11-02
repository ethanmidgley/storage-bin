import {
  ActionFunction,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { Form, useSubmit } from "@remix-run/react";
import { useRef } from "react";
import { v4 } from "uuid";
import { Box } from "~/components/Box";
import { Heading } from "~/components/Heading";
import { join } from "~/entry.server";
import { db } from "~/utils/db.server";

export const action: ActionFunction = async ({ request }) => {
  const fileID = v4();

  try {
    const item = await db.item.create({ data: { id: fileID } });
    const uploadHandler = unstable_composeUploadHandlers(
      unstable_createFileUploadHandler({
        directory: join(__dirname, "../", "storage"),
        maxPartSize: 5_000_000,
        file: () => fileID,
      }),
      unstable_createMemoryUploadHandler()
    );
    await unstable_parseMultipartFormData(request, uploadHandler);
    return item;
  } catch (err) {
    console.log(err);
  }
};

export const Items = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const submit = useSubmit();
  return (
    <>
      <div className="flex flex-row justify-between">
        <Heading>Items</Heading>

        <Form
          onChange={(e) =>
            submit(e.currentTarget, {
              replace: true,
              encType: "multipart/form-data",
              method: "post",
            })
          }
        >
          <input
            className="hidden"
            id="multiple_files"
            type="file"
            name="file"
            ref={fileRef}
            multiple
          />
          <input type="hidden" name="_action" value="upload" />
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              fileRef.current?.click();
            }}
          >
            Select files
          </button>
        </Form>
      </div>
      <Box className="w-full">Hello</Box>
    </>
  );
};

export default Items;
