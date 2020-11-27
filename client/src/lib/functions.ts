import axios from "axios";
import Response from "../interfaces/Response";

type AllowedMethods = "GET" | "POST" | "PUT" | "DELETE";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export function handleRequest(path: string, method: AllowedMethods, data?: object) {
  return axios({
    url: `${SERVER_URL}/api/v1${path}`,
    method,
    data,
    withCredentials: true,
  });
}

export function isSuccess(res: Response) {
  return res.data.status && res.data.status === "success";
}
