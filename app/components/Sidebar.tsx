import { Link } from "@remix-run/react";

export const Sidebar = () => {
  return (
    <aside className="w-64 h-screen" aria-label="Sidebar">
      <div className="overflow-y-auto h-full py-4 px-3 bg-gray-50 rounded-r dark:bg-gray-800">
        <a
          href="https://flowbite.com/"
          className="flex items-center pl-2.5 mb-5"
        >
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Storage bin
          </span>
        </a>
        <ul className="space-y-2">
          <li>
            <Link
              to={"/manage"}
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <g>
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" />
                </g>
              </svg>
              <span className="ml-3">Items</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/logout"}
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2a9.985 9.985 0 0 1 8 4h-2.71a8 8 0 1 0 .001 12h2.71A9.985 9.985 0 0 1 12 22zm7-6v-3h-8v-2h8V8l5 4-5 4z" />
                </g>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
