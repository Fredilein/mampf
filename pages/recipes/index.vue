<template>
  <div>
    <div
      class="container p-3 mx-auto mb-12 font-mono text-left bg-gray-100 shadow-md dark:bg-gray-900 dark:text-gray-100 rounded-md"
    >
      <div class="font-bold">
        Recipes
      </div>
      - List (currently your own) recipes<br>
      - Need to be logged in<br>
    </div>
    <div v-if="recipes.length" class="flex justify-center">
      <ul class="text-gray-900 w-full">
        <li v-for="recipe in recipes" :key="recipe._id">
          <RecipeLink :recipe="recipe" />
        </li>
      </ul>
    </div>

    <div v-else class="alert alert-info">
      No recipes found.
    </div>
  </div>
</template>
<script>
export default {
  async asyncData (context) {
    const { data } = await context.$axios.get('/api/recipe/own')
    return {
      recipes: data
    }
  }
}
</script>
