import Cookies from "js-cookie";

export async function authenticatedFetch(
  url: string,
  method: string,
  setResponseData: (responseData: Record<string, any>) => void
) {
  const authToken = Cookies.get("djangoAuth");
  if (authToken) {
    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    });
    if (response.status === 401) {
      window.location.href = "/the-database-frontend/#/login";
    } else if (response.status === 200) {
      const responseData = await response.json();
      setResponseData(responseData);
    }
  } else {
    window.location.href = "/the-database-frontend/#/login";
  }
}
