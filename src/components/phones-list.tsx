import React from "react";
import useSWR from "swr";
import toast from "react-hot-toast";
import Link from "next/link";
import Modal from "@components/modal";
import Paginate from "@components/paginate";
import { Dialog } from "@headlessui/react";
import { client } from "@libs/fetch";
import { ExclamationIcon, PencilIcon, TrashIcon } from "@libs/icons";
import twConfig from "@libs/tailwind-config";
import { Spinner } from "./skeleton/spinner";

const DeleteModal = ({ isOpen, onClose, phoneId }) => {
  const onSubmit = () => {
    client(`/phones/${phoneId}`, {
      method: "DELETE",
    })
      .then(() => {
        onClose();
        toast.success("Phone deleted!");
      })
      .catch((e) => {
        toast.error(e?.message ?? "There was a problem");
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationIcon
              color="red"
              hoverColor="red"
              width={20}
              height={20}
              className="text-red-600"
            />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <Dialog.Title
              as="h3"
              className="text-lg leading-6 font-medium text-gray-900"
            >
              Delete phone
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete the phone?
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onSubmit}
          >
            Delete
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

const PhonesList = ({ searchFilter }) => {
  const [page, setPage] = React.useState(1);
  const [targetPhone, setTargetPhone] = React.useState(null);

  const { data: phonesData, mutate } = useSWR(
    `phones?page=${page}&search=${searchFilter}`,
    client
  );

  const colors = twConfig.theme.colors;

  if (!phonesData) return (
    <div className="flex flex-col items-center p-3">
      <Spinner />
      <p className="pt-2">Carregando...</p>
    </div>
  )

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              id
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              value
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              monthy price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              setup price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              currency
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Remove</span>
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {phonesData.results.map((phone) => (
            <tr key={phone.id} role="row">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {phone.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {phone.value}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {phone.monthyPrice}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {phone.setupPrice}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {phone.currency}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex flex-row">
                  <Link href={`/phones/${phone.id}/editar`}>
                    <PencilIcon
                      color="#333"
                      hoverColor={colors["primary"]}
                      width={20}
                      height={20}
                      className="mr-2 cursor-pointer"
                    />
                  </Link>
                  <TrashIcon
                    color="#333"
                    hoverColor={colors["primary"]}
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    onClick={() => setTargetPhone(phone)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Paginate
        currentPage={page}
        totalResults={phonesData?.count}
        setPage={setPage}
      />
      <DeleteModal
        isOpen={targetPhone !== null}
        onClose={() => {
          mutate();
          setTargetPhone(null);
        }}
        phoneId={targetPhone?.["id"]}
      />
    </div>
  );
};

export default PhonesList;
