import { redirect, Response } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import invariant from "tiny-invariant";
import files from "~/utils/files.server";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.id, "File id");
  try {
    const data = await files.get(params.id);
    return new Response(data);
  } catch (err) {
    return redirect("/404");
  }
};
