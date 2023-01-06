import { NextApiRequest, NextApiResponse } from "next";
import { getCookie, setCookie } from "@libs/auth-cookies";
import { SAMPLE_DATA_COOKIE_KEY } from "@utils/constraints";
import { samplePhonesData } from "@utils/sample-data";

const phonesApi = (_req: NextApiRequest, res: NextApiResponse) => {
  const searchText = _req.query?.search || "";
  const page = Number(_req.query?.page ?? 1);
  let sampleData = samplePhonesData
  
  if(getCookie(_req, SAMPLE_DATA_COOKIE_KEY)) {
    sampleData = JSON.parse(getCookie(_req, SAMPLE_DATA_COOKIE_KEY))
  } else {
    setCookie(res, SAMPLE_DATA_COOKIE_KEY, JSON.stringify(sampleData))
  }

  const filteredResults = sampleData.filter((phone) =>
    phone.value.includes(String(searchText))
  );
  res.json({
    count: filteredResults.length,
    results: filteredResults.slice((page - 1) * 10, page * 10),
  });
};

export default phonesApi;
