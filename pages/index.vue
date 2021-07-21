<template>
  <div id="map">
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
export default {
  data(){
    return {
      access_token: process.env.MAPBOX_TOKEN,
      map: {}
    }
  },
  mounted(){
    this.createMap()
  },
  methods: {
    createMap(){
      mapboxgl.accessToken = this.access_token
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 11,
        center: [-87.661557, 41.893748]
      })

    }
  }
}
</script>

<style scoped>
#map {
   width:100%;
   height:100vh;
}
</style>