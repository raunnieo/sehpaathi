import { auth } from "../auth/firebase";

class ApiManager {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getHeaders() {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("No user is currently signed in");
    }
    const token = await user.getIdToken();
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${this.baseURL}${endpoint}${queryString ? `?${queryString}` : ''}`;
    const headers = await this.getHeaders();

    const response = await fetch(url, { headers });
    return this.handleResponse(response);
  }

  async post(endpoint, data, isFormData = false) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = await this.getHeaders();
    
    const config = {
      method: 'POST',
      headers: isFormData ? { Authorization: headers.Authorization } : headers,
      body: isFormData ? data : JSON.stringify(data)
    };

    const response = await fetch(url, config);
    return this.handleResponse(response);
  }

  async handleResponse(response) {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || error.error || `API Error: ${response.status}`);
    }
    return await response.json();
  }
}

export const apiManager = new ApiManager(
  import.meta.env.VITE_ENVIRONMENT === "local"
    ? "http://localhost:3000/api"
    : `${import.meta.env.VITE_BACKEND_URL}/api`
);