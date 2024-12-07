<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="loginUser">
      <label>Email:</label>
      <input v-model="email" type="email" required />
      <label>Password:</label>
      <input v-model="password" type="password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const email = ref("");
    const password = ref("");

    const loginUser = async () => {
      try {
        await authStore.login(email.value, password.value);
        router.push("/todos");
      } catch (error) {
        alert("Invalid login credentials");
      }
    };

    return {
      email,
      password,
      loginUser,
    };
  },
};
</script>
