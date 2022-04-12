<template>
  <div>
    <h1>My Account</h1>

    <hr>

    <div class="mb-5">
      <strong>Username:</strong> {{ $auth.user.username }}<br>
      <strong>Email:</strong> {{ $auth.user.email }}
    </div>
    <nuxt-link to="/user/logout" class="btn btn-danger">
      Logout
    </nuxt-link>
  </div>
</template>

<script>
export default {
  middleware: 'auth'
}
</script>
