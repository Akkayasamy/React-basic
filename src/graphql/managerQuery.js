import { GQL_ENDPOINT } from "../config";
import { getToken } from "../utils/auth";

export const fetchManagersAPI = async () => {
  try {
    const token = getToken();

    const res = await fetch(GQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
          query GetAllManagers {
            getAllManagers {
              status
              errorMessage
              results {
                id
                name
              }
            }
          }
        `,
      }),
    });

    const json = await res.json();
    return json?.data?.getAllManagers;
  } catch (error) {
    console.error("fetchManagersAPI error:", error);
    return null;
  }
};