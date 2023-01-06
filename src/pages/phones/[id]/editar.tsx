import Layout from "@components/layout";
import { Spinner } from "@components/skeleton/spinner";
import { client } from "@libs/fetch";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR from "swr";

const PhoneLoading = () => {
  return (
    <Layout>
      <Spinner />
    </Layout>
  );
};

const EditPhone = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: phoneData } = useSWR(id ? `phones/${id}` : null, client, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  const { register, reset, handleSubmit } = useForm({
    defaultValues: React.useMemo(() => {
      return {
        value: phoneData?.["value"],
        monthyPrice: phoneData?.["monthyPrice"],
        setupPrice: phoneData?.["setupPrice"],
        currency: phoneData?.["currency"],
      };
    }, [phoneData]),
  });

  React.useEffect(() => {
    reset(phoneData);
  }, [phoneData]);

  const onSubmit = (values) => {
    client(`/phones/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        id,
        ...values,
      }),
    })
      .then(() => {
        toast.success("Phone updated!");
        router.push("/");
      })
      .catch((e) => {
        toast.error(e?.message ?? "There was a problem");
      });
  };

  if (!phoneData) return <PhoneLoading />;

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen pt-[120px]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex flex-col">
            <div className="md:col-span-1 mb-6">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Edit Phone
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  [{id}] {phoneData.value}
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Value
                        </label>
                        <input
                          {...register("value")}
                          className="mt-1 py-2 px-3 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="email-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Monthy Price
                        </label>
                        <input
                          {...register("monthyPrice")}
                          className="mt-1 py-2 px-3 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="email-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Setup Price
                        </label>
                        <input
                          {...register("setupPrice")}
                          className="mt-1 py-2 px-3 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Currency
                        </label>
                        <select
                          {...register("currency")}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        >
                          <option value="U$">U$</option>
                          <option value="BRL">BRL</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 space-x-2">
                    <Link
                      href="/"
                      className="inline-flex justify-center py-2 px-4 bg-transparent shadow-sm text-sm font-medium rounded-md text-white border border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      Cancelar
                    </Link>
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-700"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditPhone;
