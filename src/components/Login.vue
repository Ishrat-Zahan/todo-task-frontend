<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="credentials.email"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="credentials.password"
          placeholder="Enter your password"
        />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';

export default {
  data() {
    return {
      credentials: {
        email: '',
        password: '',
      },
      error: '',
    };
  },
  setup() {
    const authStore = useAuthStore();

    const handleLogin = async () => {
      try {
        await authStore.login(this.credentials);
        this.$router.push('/todos'); // Redirect to Todos page on successful login
      } catch (err) {
        this.error = 'Invalid email or password.';
      }
    };

    return { handleLogin };
  },
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: auto;
}
.error {
  color: red;
}
</style>
