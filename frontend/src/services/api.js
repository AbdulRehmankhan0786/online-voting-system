const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (loginData) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(loginData)
  });

  return response.json();
};