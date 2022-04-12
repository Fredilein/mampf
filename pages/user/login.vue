<template>
  <div
    class="
      flex
      items-center
      justify-center
      min-h-full
      px-4
      py-12
      sm:px-6
      lg:px-8
    "
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <h2 class="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-sm text-center text-gray-600">
          New here?
          <router-link
            to="/user/register"
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Create an account
          </router-link>
        </p>
      </div>

      <form class="mt-8 space-y-4" @submit.prevent="submitForm">
        <div>
          <label for="email" class="sr-only">Email address</label>
          <input
            id="email"
            v-model="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="inp-account"
            placeholder="Email address"
          >
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input
            id="password"
            v-model="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            class="inp-account"
            placeholder="Password"
          >
        </div>
        <div>
          <button type="submit" class="btn-account">
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  auth: 'guest',
  data () {
    return {
      errors: null,
      login_error: null,
      email: null,
      password: null,
      status: false
    }
  },
  methods: {
    submitForm () {
      this.$auth
        .loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        .catch((error) => {
          if (error.response.data.message) {
            this.login_error = error.response.data.message
          }
        })
    }
  }
}
</script>
