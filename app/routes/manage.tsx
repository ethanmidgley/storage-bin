import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { requireLoggedIn } from "~/utils/session.server";
import Sidebar from "~/components/Sidebar";

export const loader: LoaderFunction = async ({ request }) => {
  return json({
    isLoggedIn: await requireLoggedIn(request, "/login"),
  });
};

export const Manage = () => {
  useLoaderData();
  return (
    <div className="flex flex-row bg-gray-100 dark:bg-gray-900 w-full">
      <Sidebar />
      <div className="mt-4 ml-4 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Manage;
