import axios from "axios";

async function apiGet(endpoint) {
  return (await axios.get(`${process.env.VUE_APP_API_HOST}${endpoint}`, {
    responseType: "json",
  })).data;
}

async function apiPost(endpoint, jsonData) {
  return (await axios.post(`${process.env.VUE_APP_API_HOST}${endpoint}`, jsonData, {
      responseType: "json",
    })).data;
}

async function apiPut(endpoint, jsonData) {
  return (await axios.put(`${process.env.VUE_APP_API_HOST}${endpoint}`, jsonData, {
      responseType: "json",
    })).data;
}

export default {
  apiGet,
  apiPost,
  apiPut,
};
