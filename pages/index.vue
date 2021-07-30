<template>
  <div id="map">
    <div id="left" class="sidebar flex-center left collapsed" v-if="this.collapsedMode === false">
      <div class="rounded-rect">
        <div class="relative flex min-h-screen bg-black items-center">
          <div class="left-card max-w-lg mx-auto sm:px-3 lg:px-7 sm:pt-0 mt-5">
            <div class="cross-mark absolute top-6 cursor-pointer right-3 text-base font-semibold text-gray-300" @click="toggleSidebar()">
            </div>
            <div class="mt-2 text-base font-semibold text-gray-400">
              お気に入りの映画館を見つけよう。
            </div>
            <div class="mt-6 text-xl text-gray-300 font-bold">
              {{ theater_name }}
            </div>
            <InfoSection :info="this.info" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mapboxgl from 'mapbox-gl';
  import InfoSection from '../components/InfoSection.vue';
  const getCinemas = () => import('../static/geodata.json').then(j => j.default || j);

  export default {
    name: "index",
    async asyncData({
      req
    }) {
      const geojson = await getCinemas()
      return {
        geojson
      }
    },
    data() {
      return {
        access_token: process.env.ACCESS_TOKEN,
        endpoint: process.env.API_GATEWAY,
        map: {},
        info: '',
        theater_name: '',
        target_day: '',
        collapsedMode: false
      }
    },
    components: {
      InfoSection
    },
    mounted() {
      this.createMap()
    },
    methods: {
      createMap() {
        mapboxgl.accessToken = this.access_token
        this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/satoru02/ckrc2mnnp0pjq17qw46hfvs2p',
          zoom: 14,
          center: [139.7679591178894, 35.681370007533836]
        });

        this.map.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true
            },
            trackUserLocation: true
          })
        );

        this.geojson.features.forEach((marker) => {
          var el = document.createElement('div');
          el.className = 'marker';
          new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(this.map)
          el.addEventListener('click', () => {
            this.theater_name = marker.properties.title
            this.getInfo(marker.properties.title)
            if(this.collapsedMode === true){
              this.toggleSidebar()
            }
          });
        })
      },
      async getInfo(theater_name) {
        await this.$axios.get(
            this.endpoint + `${theater_name}`
          ).then(res => this.info = res.data.cnm_info)
          .catch(err => console.log(err))
      },
      toggleSidebar(){
        this.collapsedMode = !this.collapsedMode
      },
    }
  }

</script>

<style lang="postcss">
  #map {
    width: 100%;
    height: 100vh;
  }

  .cross-mark {
    background-image: url('../static/letter-x.png');
    background-size: cover;
    width: 15px;
    height: 15px;
    cursor: pointer;
  }

  .marker {
    background-image: url('../static/placeholder.png');
    background-size: cover;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
  }

  .rounded-rect {
    background: white;
    border-radius: 10px;
    box-shadow: 0 0 50px -25px black;
  }

  .flex-center {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sidebar-content {
    width: 100%;
    height: 100%;
  }

  .sidebar {
    max-width: 320px;
    z-index: 1;
    height: 100%;
  }

  .left-card {
    overflow-y: scroll;
    overflow-x: scroll;
    max-height: 800px;
  }

  .new_badge {
    @apply border border-gray-300 rounded-lg px-3 py-1 text-base font-semibold text-white;

    &:hover {
      @apply bg-gray-300;
    }
  }
</style>
