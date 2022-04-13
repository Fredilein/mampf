<template>
  <div>
    <nav>
      <ul>
        <li>
          <NuxtLink to="/">
            Home
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/recipes">
            Recipes
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/user/me">
            Profile
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="container mx-auto max-w-lg p-2">
      <nuxt />
    </div>
  </div>
</template>
<style>
/* exact link will show the primary color for only the exact matching link */
a.nuxt-link-exact-active {
  font-weight: bold;
  color: #00c58e;
}
ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
li {
  margin: 0 0.5rem;
  padding: 0.25rem;
  font-size: 1.2rem;
}

nav {
  padding: 0 1rem;
}

a,
a:visited {
  text-decoration: none;
  color: inherit;
}

a:hover {
  color: #00c58e;
}
</style>
