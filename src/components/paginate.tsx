import { pagination } from "@utils/index";

const Paginate = ({ currentPage, totalResults, setPage, pageSize = 10 }) => {
  const maxPages = Math.ceil(totalResults / pageSize);
  
  const changePage = (newPage) => {
    if (newPage > 0 && newPage <= maxPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">{Math.min((currentPage - 1) * pageSize + 1, totalResults)}</span>
            {" to "}
            <span className="font-medium">
              {Math.min(currentPage * pageSize, totalResults)}
            </span>
            {" of "}
            <span className="font-medium">{totalResults}</span>
            {" results"}
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => changePage(currentPage - 1)}
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {pagination(currentPage, maxPages).map((pageIndex) => {
              const selected = pageIndex == currentPage;
              return (
                <button
                  key={pageIndex}
                  aria-current="page"
                  onClick={() => changePage(pageIndex)}
                  className={`${
                    selected
                      ? "text-indigo-600 border-indigo-500 bg-indigo-50 button-active"
                      : "hover:bg-gray-50 text-gray-500 border-gray-300 bg-white"
                  } relative z-10 inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 page-button`}
                >
                  {pageIndex}
                </button>
              );
            })}

            <button
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              onClick={() => changePage(currentPage + 1)}
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Paginate;
