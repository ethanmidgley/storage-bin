import type { ActionFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { createUserSession, login } from "~/utils/session.server";

interface ActionResponse {
  error?: string;
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  let password = form.get("password");
  if (typeof password != "string") {
    throw new Error("Form not submitted properly");
  }
  const validPassword = login(password);
  if (!validPassword) {
    return { error: "Incorrect password" } as ActionResponse;
  }
  return createUserSession("/manage");
};

export const Login = () => {
  const actionData = useActionData<ActionResponse>();
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-gray-100  dark:bg-gray-900">
      <div className="w-96 p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Management sign in
        </h1>
        <div>
          <form method="post">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`${
                actionData?.error ? "ring-red-500" : ""
              } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="•••••••••"
              required
            />
            {actionData?.error ? (
              <p className="text-red-500 text-s italic">{actionData.error}</p>
            ) : null}
            <button
              type="submit"
              className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
