<template>
  <section class="container">
    <header-nav />
    <div>
      <h1 class="title">
        perfs-benchmark : heavy list
      </h1>
      <h2 class="subtitle">
        Rendering 5000 items for some reasons, SSR
      </h2>
      <div class="sample">
        <ul>
          <li
            v-for="(item, n) in items"
            :key="n">
            <a :href="item.url">
              {{ item.title }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import HeaderNav from '~/components/HeaderNav.vue'

export default {
  components: {
    HeaderNav,
  },
  async asyncData() {
    let { data } = await axios.get(`https://jsonplaceholder.typicode.com/photos`)
    return { items: data }
  },
}
</script>
