import { json, redirect } from "@remix-run/node";
import type {
  ActionFunction,
  LoaderFunction,
  TypedResponse,
} from "@remix-run/node";
import {
  Form,
  Link,
  useFetcher,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import { useRef } from "react";
import { Heading } from "~/components/Heading";
import { db } from "~/utils/db.server";
import type Prisma from "@prisma/client";
import { Item } from "~/components/Item";
import { Button } from "~/components/Button";
import files from "~/utils/files.server";

type LoaderResponse = {
  results?: Prisma.Item[];
  count: number;
  page: number;
  take: number;
};

type ActionResponse = {
  formError?: string;
  message?: string;
  deleted?: boolean;
};

const badRequest = (data: ActionResponse) => json(data, 400);

export const action: ActionFunction = async ({
  request,
}): Promise<TypedResponse<ActionResponse>> => {
  const data = await request.formData();
  const id = data.get("id");
  if (typeof id !== "string") {
    return badRequest({ formError: "invalid form submitted" });
  }
  try {
    await db.item.delete({ where: { id: id } });
    await files.remove(id);
  } catch (err) {
    return json(
      { message: "unable to delete from database try again later" },
      500
    );
  }

  return json({ deleted: true });
};

const getPage = (searchParams: URLSearchParams) =>
  Number(searchParams.get("page") || 1);

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderResponse> => {
  let page = getPage(new URL(request.url).searchParams);
  let take = 10;
  return {
    results: await db.item.findMany({
      take: take,
      skip: (page - 1) * take || 0,
      orderBy: { createdAt: "desc" },
    }),
    count: await db.item.count({}),
    page: page,
    take: take,
  };
};

export const Items = () => {
  const fetcher = useFetcher();

  const items = useLoaderData<LoaderResponse>();
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
              action: "/manage/upload",
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
      <div className="w-3/5 mx-auto">
        {items.results?.map((val, idx) => (
          <Item item={{ ...val, createdAt: new Date(val.createdAt) }} key={idx}>
            <fetcher.Form replace method="post">
              <input type="hidden" value={val.id} name="id" />
              <input type="hidden" value={items.take} name="take" />
              <Button type="submit">Delete</Button>
            </fetcher.Form>
          </Item>
        ))}
        <div className="flex flex-row justify-between mt-4">
          {items.page != 1 ? (
            <Link to={`?page=${items.page - 1}`}>
              <Button className="m-1 p-2 w-fit">Previous</Button>
            </Link>
          ) : (
            <div></div>
          )}
          {items.take * items.page < items.count ? (
            <Link to={`?page=${items.page + 1}`}>
              <Button className="m-1 p-2 w-fit">Next</Button>
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Items;
