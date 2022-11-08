import {
  ActionFunction,
  redirect,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { v4 } from "uuid";
import { join } from "~/entry.server";
import { db } from "~/utils/db.server";
import { requireLoggedIn } from "~/utils/session.server";

export const action: ActionFunction = async ({ request }) => {
  requireLoggedIn(request);

  const fileID = v4();

  try {
    await db.item.create({ data: { id: fileID } });
    const uploadHandler = unstable_composeUploadHandlers(
      unstable_createFileUploadHandler({
        directory: join(__dirname, "../", "storage"),
        maxPartSize: 5_000_000,
        file: () => fileID,
      }),
      unstable_createMemoryUploadHandler()
    );
    await unstable_parseMultipartFormData(request, uploadHandler);
    return redirect("/manage");
  } catch (err) {
    console.log(err);
  }
};
