import { AxiosResponse } from "axios";

interface Response extends AxiosResponse {
  data: {
    status: "error" | "success";
    error: string;
    [k: string]: any;
  };
}

export default Response;
