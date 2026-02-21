const API_URL = import.meta.env.VITE_API_URL;


// LOGIN
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


// GET CANDIDATES
export const getCandidates = async () => {
  const res = await fetch(`${API_URL}/candidate/results`);
  return res.json();
};


// VOTE
export const voteCandidate = async (candidateId, token) => {
  const res = await fetch(`${API_URL}/candidate/vote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ candidateId })
  });

  return res.json();
};