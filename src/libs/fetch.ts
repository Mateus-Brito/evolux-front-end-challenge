import { API_URL } from "@utils/constraints";

const defaultHeaders = {
  "content-type": "application/json",
};

const parseBody = (body, stringify) => {
  if (stringify) {
    return JSON.stringify(body);
  }
  return body;
};

const client = async (
  endpoint,
  {
    method = "GET",
    headers = defaultHeaders,
    body = null,
    stringify = true,
  } = {}
) => {
  const config = {
    method: method,
    headers: headers,
  };
  if (body) {
    config["body"] = parseBody(body, stringify);
  }

  return fetch(`${API_URL}/${endpoint}`, config).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

export { client };
