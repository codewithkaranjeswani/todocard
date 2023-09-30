import axios from "axios";
import { toast } from "react-toastify";

export function toastifyError(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Request made but the server responded with an error
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
      toast.error(
        `error: status = ${error.response.status}, data = ${JSON.stringify(
          error.response.data
        )}`
      );
    } else if (error.request) {
      // Request made but no response is received from the server.
      // console.log(error.request);
      toast.error(`error in request = ${error.request}`);
    } else {
      // Error occured while setting up the request
      // console.log("Error", error.message);
      toast.error(`error message = ${error.message}`);
    }
  } else {
    toast.error(`e = ${JSON.stringify(error)}`);
  }
}
