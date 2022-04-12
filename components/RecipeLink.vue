<template>
  <div v-if="previewData">
    <div class="flex flex-nowrap w-full h-24 border border-gray-200 shadow-md rounded-md">
      <img class="h-full w-32 object-cover rounded-l-md" v-if="previewData.images" :src="previewData.images[0]" />
      <div class="p-3 w-full relative">
          <p class="text-lg font-medium leading-tight text-gray-800">{{ recipe.title }}</p>
          <p class="absolute inset-x-3 bottom-3 text-sm text-gray-500">{{ recipe.link | host }}</p>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading preview data</p>
  </div>
</template>
<script>
export default {
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      previewData: null
    }
  },
  mounted () {
    this.previewData = this.fetchPreview(this.recipe.link)
  },
  methods: {
    async fetchPreview () {
      const { data } = await this.$axios.post(
        '/api/helper/preview',
        {
          link: this.recipe.link
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      this.previewData = data
    }
  }
}
</script>
