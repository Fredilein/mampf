import Vue from 'vue'

Vue.filter('host', (url) => {
  const urlTrim = url
    ? url
      .split('/')
      .slice(1, 3)
      .join('')
    : ''
  return urlTrim;
})
