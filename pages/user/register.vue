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
          Create an account
        </h2>
        <p class="mt-2 text-sm text-center text-gray-600">
          Already have an account?
          <router-link
            to="/user/login"
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Log in
          </router-link>
        </p>
      </div>

      <form class="mt-8 space-y-4" @submit.prevent="registerUser">
        <div>
          <label for="name" class="sr-only">Username</label>
          <input
            id="name"
            v-model="name"
            name="name"
            type="text"
            autocomplete="username"
            required
            class="inp-account"
            placeholder="Username"
          >
        </div>
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
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  auth: 'guest',
  data () {
    return {
      errors: null,
      full_name: null,
      email: null,
      password: null,
      status: false
    }
  },
  methods: {
    submitForm () {
      this.$axios
        .post('/api/users/register', {
          full_name: this.full_name,
          email: this.email,
          password: this.password
        })
        .then((response) => {
          if (response.data._id) {
            this.$router.push({
              name: 'user-login',
              params: { registered: 'yes' }
            })
            // log in if successfully registered
            this.$auth
              .loginWith('local', {
                data: {
                  email: this.email,
                  password: this.password
                }
              })
          }
        })
        .catch((error) => {
          if (error.response.data.errors) {
            this.errors = error.response.data.errors
          }
        })
    }
  }
}
</script>
