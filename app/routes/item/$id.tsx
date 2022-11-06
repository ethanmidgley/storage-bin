import { Response } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getFile } from "~/utils/getFile.server";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.id, "File id");
  const data = await getFile(params.id);
  return new Response(data);
};