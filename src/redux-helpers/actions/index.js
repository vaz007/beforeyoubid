import axios from "axios";

// API_URL is usually stored in .env file.
const API_URL = "http://127.0.0.1:3004/contactInformation/";

export const contactInformation = (formValues) => async (dispatch) => {
  // axios req should be on reducer file instead of action
  dispatch({
    type: "CONTACT_INFORMATION",
    payload: formValues,
  });
  return await axios
    .post(API_URL, formValues)
    .then((res) => {
      if (res.statusText === "Created") {
        console.log("success")
      }
    })
    .catch((err) => {
      console.error("Problem saving the data", err);
    });
};
