import { NextApiRequest, NextApiResponse } from "next";
import { samplePhonesData } from "@utils/sample-data";
import { getCookie, setCookie } from "@libs/auth-cookies";
import { SAMPLE_DATA_COOKIE_KEY } from "@utils/constraints";

const phonesApi = (_req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = _req;
  let sampleData = samplePhonesData;

  if (getCookie(_req, SAMPLE_DATA_COOKIE_KEY)) {
    sampleData = JSON.parse(getCookie(_req, SAMPLE_DATA_COOKIE_KEY));
  }

  let phone = sampleData.filter(phone => Number(phone['id']) === Number(id))?.[0];
  if (_req.method === "PATCH") {
    const body = JSON.parse(_req.body);
    if(body["value"]) phone["value"] = body["value"]
    if(body["monthyPrice"]) phone["monthyPrice"] = body["monthyPrice"]
    if(body["setupPrice"]) phone["setupPrice"] = body["setupPrice"]
    if(body["currency"]) phone["currency"] = body["currency"]
    setCookie(res, SAMPLE_DATA_COOKIE_KEY, JSON.stringify(sampleData));
  } else if (_req.method === "DELETE") {
    setCookie(
      res,
      SAMPLE_DATA_COOKIE_KEY,
      JSON.stringify(sampleData.filter((phone) => Number(phone['id']) !== Number(id)))
    );
  }

  res.json(phone);
};

export default phonesApi;
