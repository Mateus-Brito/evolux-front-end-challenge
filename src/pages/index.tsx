import Layout from "@components/layout";
import PhonesList from "@components/phones-list";
import { SearchState } from "@reducers/index";
import { updateSearchAction } from "actions";
import React from "react";

import { useDispatch, useSelector } from "react-redux";


const Index = () => {
  const search = useSelector((state: SearchState) => state.value);
  const dispatch = useDispatch();

  const onChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSearchAction(e.target.value));
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <header className="pt-24 pb-12">
            <h1 className="text-4xl font-extrabold text-center tracking-tight text-gray-900">
              Telecom Carrier
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-base text-gray-500 text-center">
              Thoughtfully designed objects for the workspace, home, and travel.
            </p>
          </header>

          <form className="flex items-center justify-center pb-20">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-1/2">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="Search"
                value={search}
                onChange={onChangeFilter}
              />
            </div>
            <button
              type="submit"
              className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>

          <section aria-labelledby="phone-table" className="mt-4">
            <div className="flex flex-col pb-12">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <PhonesList searchFilter={search} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
