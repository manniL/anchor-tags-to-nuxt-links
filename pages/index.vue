<script setup lang="ts">
import { vInterpolate } from '~/directives/v-interpolate.js'

// TODO: Please sanitize your content before using v-html!
const contentFromApiCall = `
Content from 3rd party, e.g. via CMS/API/...
    <a href="/about">
      To about page
    </a>
`

</script>

<template>
  <div>
    <h1>Content below</h1>
    <div v-interpolate v-html="contentFromApiCall" />
  </div>
</template>