import Cookies from "js-cookie";
import { cookieConfiguration } from "../constants/objectConstants";

export async function authenticatedFetch(
  url: string,
  method: string,
  handleResponseData: (responseData: Record<string, any>) => void,
  body?: Record<string, any>
) {
  const authToken = Cookies.get(cookieConfiguration.name);
  if (authToken) {
    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    if (response.status === 401) {
      window.location.href = "/the-database-frontend/#/login";
    } else if (response.status === 400) {
      const responseData = await response.json();
      console.error(responseData.errorSummary)
    } else if (response.status === 200) {
      const responseData = await response.json();
      handleResponseData(responseData);
    }
  } else {
    window.location.href = "/the-database-frontend/#/login";
  }
}
