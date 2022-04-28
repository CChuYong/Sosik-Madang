import axios from "axios";

async function apiGet(endpoint) {
  return await axios.get(`${process.env.VUE_APP_API_HOST}${endpoint}`, {
    responseType: "json",
  });
}

async function apiPost(endpoint, jsonData) {
  const data = typeof(jsonData) !== "string" ? JSON.parse(jsonData) : jsonData;

  return await axios.post(`${process.env.VUE_APP_API_HOST}${endpoint}`, data, {
    responseType: "json",
  });
}

async function apiPut(endpoint, jsonData) {
  const data = typeof(jsonData) !== "string" ? JSON.parse(jsonData) : jsonData;

  return await axios.put(`${process.env.VUE_APP_API_HOST}${endpoint}`, data, {
    responseType: "json",
  });
}

export default {
  apiGet,
  apiPost,
  apiPut,
};
