import Vue from 'vue'

Vue.filter('host', (url) => {
  const url_trim = url
    ? url
      .split('/')
      .slice(1, 3)
      .join('')
    : '';
  return url_trim;
})
