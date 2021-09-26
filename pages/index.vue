<template>
  <section>
    <client-only>
      <v-dialog />
    </client-only>
    <div id="map">
      <div v-if="this.isCollapsed === false" id="left" class="shadow-xl sidebar flex-center left collapsed">
        <div class="rounded-rect">
          <div class="relative flex min-h-screen bg-black items-center">
            <div class="w-80 min-w-full left-card max-w-lg mx-auto sm:px-3 lg:px-2 sm:pt-0 mt-5">
              <div class="mt-2 text-3xl font-semibold text-gray-200">
                映画MAP
              </div>
              <div v-if="!theaterName" class="mt-2 text-lg font-semibold text-gray-400">
                お気に入りの映画館を見つけよう。
              </div>
              <div v-if="theaterName" class="flex items-start pt-6">
                <div class="h-12 mr-2 mt-1">
                  <BaseIcon icon-name="icon-theater-mark" :viewBox="'0 0 410 410'" :iconColor="'#ffea00'" :height="'20'"
                    :width="'20'">
                    <TheaterIcon />
                  </BaseIcon>
                </div>
                <div class="text-xl text-white font-bold">{{ theaterName }}</div>
              </div>
              <Loading v-if="isLoading" />
              <InfoSection v-if="this.movieScreenInfo" :movieScreenInfo="this.movieScreenInfo" :theaterName="theaterName" />
              <button v-if="theaterName" @click="toggleSidebar()" class="mt-5 back-button mb-10 w-24 min-w-full">
                閉じる
              </button>
              <button v-else @click="toggleSidebar()" class="mt-5 back-button mb-10 w-24 min-w-full">
                映画館を探す
              </button>
              <div class="flex flex-wrap mb-16">
                <div @click="openProfileDialog()" class="font-medium cursor-pointer hover:text-indigo-600 text-xs px-5 mb-3 text-gray-400">
                  映画MAPについて
                </div>
                <div @click="openContactDialog()" class="font-medium cursor-pointer hover:text-indigo-600 text-xs px-5 mb-3 text-gray-400">
                  お問い合わせ
                </div>
                <div class="font-medium text-xs px-5 mb-3 text-gray-400">
                  © 2021 映画MAP
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import mapboxgl from 'mapbox-gl';
  import ContactModal from '@/components/ContactModal.vue';

  const prepareGeodata = () => import('../static/geodata.json').then((geoData) => geoData.default || geoData);

  export default {
    name: "index",
    components: {
      'BaseIcon': () => import('@/components/icon/BaseIcon.vue'),
      'TheaterIcon': () => import('@/components/icon/TheaterIcon.vue'),
      'Loading': () => import('@/components/Loading.vue'),
      'InfoSection': () => import('@/components/InfoSection.vue'),
    },
    async asyncData({
      req
    }) {
      const geojson = await prepareGeodata()
      return {
        geojson
      }
    },
    data() {
      return {
        accessToken: process.env.ACCESS_TOKEN,
        theatersApiUri: process.env.API_GATEWAY,
        map: {},
        isCollapsed: false,
        isLoading: false,
        movieScreenInfo: '',
        theaterName: '',
      }
    },
    mounted() {
      this.createMap()
      this.$ga.page('/')
    },
    methods: {
      createMap() {
        mapboxgl.accessToken = this.accessToken

        this.map = new mapboxgl.Map({
          container: 'map',
          style: process.env.MAPBOX_STYLE_PATH,
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
          var popup = new mapboxgl.Popup({
            offset: 25
          }).setText(
            marker.properties.title
          );
          new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .setPopup(popup)
            .addTo(this.map)
          el.addEventListener('click', () => {
            this.theaterName = marker.properties.title
            this.fetchMovieScreenInfo(this.theaterName)
            if (this.isCollapsed === true) {
              this.toggleSidebar()
            }
          });
        })
      },
      async fetchMovieScreenInfo(theaterName) {
        this.isLoading = true
        await this.$axios.get(
            this.theatersApiUri + `${theaterName}`
          ).then(res => this.fetchSuccessful(res))
          .catch(err => console.log(err))
      },
      fetchSuccessful(res) {
        this.isLoading = false
        // TODO: fix database colums naming. [cnm_info] means movie screening information.
        this.movieScreenInfo = res.data.cnm_info
      },
      toggleSidebar() {
        this.isCollapsed = !this.isCollapsed
      },
      openProfileDialog() {
        this.$modal.show('dialog', {
          title: '映画館MAPとは？',
          text: "国内映画館の最新の上映情報をMAPで確認出来るサービスです。今いる場所から一番近い映画館を探したい、旅先で映画館に行きたい、暇な時間にふらっといける映画館をチェックしたい。そんな時に簡単に映画館を見つける事が出来ます。",
          buttons: [{
            title: '閉じる',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }]
        })
      },
      openContactDialog() {
        this.$modal.show(
          ContactModal, {
            text: ''
          }, {
            height: 'auto'
          }, {
            'before-close': event => {}
          }
        )
      }
    }
  }

</script>

<style lang="postcss">
  #map {
    width: 100%;
    height: 100vh;
  }

  .mapboxgl-popup {
    max-width: 200px;
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

  .back-button {
    @apply bg-green-400 rounded-md px-8 py-1 text-lg font-semibold text-white;

    &:hover {
      @apply bg-green-600;
    }
  }

</style>
