import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/login", {
          email,
          password,
        });
        this.token = response.data.token;
        this.user = response.data.user;
        this.isAuthenticated = true;
        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      axios.defaults.headers.common["Authorization"] = null;
    },
  },
});
