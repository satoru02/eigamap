<template>
  <section>
    <div id="map">
      <div id="left" class="shadow-xl sidebar flex-center left collapsed" v-if="this.collapsedMode === false">
        <div class="rounded-rect">
          <div class="relative flex min-h-screen bg-black items-center">
            <div class="w-80 min-w-full left-card max-w-lg mx-auto sm:px-3 lg:px-2 sm:pt-0 mt-5">
              <!-- <div class="cross-mark absolute top-7 cursor-pointer right-3 text-base font-semibold text-gray-300"
                @click="toggleSidebar()">
                <BaseIcon icon-name="icon-crossMark" :viewBox="'0 0 22.88 22.88'" :iconColor="'#ffffff'" :height="'17'"
                  :width="'17'">
                  <CrossMark />
                </BaseIcon>
              </div> -->
              <div class="mt-2 text-3xl font-semibold text-gray-200">
                映画館MAP
              </div>
              <div class="mt-2 text-lg font-semibold text-gray-400" v-if="!theater_name">
                お気に入りの映画館を見つけよう。
              </div>
              <div class="flex items-start pt-6" v-if="theater_name">
                <div class="h-12 mr-2 mt-1">
                  <BaseIcon icon-name="icon-theater-mark" :viewBox="'0 0 410 410'" :iconColor="'#ffea00'" :height="'20'"
                    :width="'20'">
                    <TheaterMark />
                  </BaseIcon>
                </div>
                <div class="text-xl text-white font-bold"> {{ theater_name }}</div>
              </div>
              <!-- <button v-if="theater_name" class="back-button mb-5 w-24 min-w-full">
                <BaseIcon icon-name="icon-theater-mark" :viewBox="'0 0 512 512'" :iconColor="'#ffffff'" :height="'25'"
                    :width="'25'">
                  <UploadMark />
                </BaseIcon>
              </button> -->
              <InfoSection :info="this.info" />
              <button v-if="theater_name" @click="toggleSidebar()" class="mt-5 back-button mb-10 w-24 min-w-full">
                閉じる
              </button>
              <button v-else @click="toggleSidebar()" class="mt-5 back-button mb-10 w-24 min-w-full">
                映画館を探す
              </button>
              <div class="flex items-center justify-center">
                <div class="font-semibold cursor-pointer hover:text-indigo-600 text-xs mr-3 text-gray-300 mb-16"
                  @click="show('about')">
                  映画館MAPについて
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-dialog />
  </section>
</template>

<script>
  import mapboxgl from 'mapbox-gl';
  import InfoSection from '../components/InfoSection.vue';
  import BaseIcon from '../components/BaseIcon.vue';
  import CrossMark from '../components/CrossMark.vue';
  import TheaterMark from '../components/TheaterMark.vue';
  import UploadMark from '../components/UploadMark.vue';
  import Header from '../components/Header.vue';
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
      InfoSection,
      BaseIcon,
      CrossMark,
      TheaterMark,
      Header,
      UploadMark
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
            this.theater_name = marker.properties.title
            this.getInfo(marker.properties.title)
            if (this.collapsedMode === true) {
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
      toggleSidebar() {
        this.collapsedMode = !this.collapsedMode
      },
      show(modalType) {

        function switchText(){
          switch(modalType){
            case 'about' : return '国内映画館の最新の上映情報をMAPで確認出来るサービスです。今いる場所から一番近い映画館を探したい、旅先で映画館に行きたい、暇な時間にふらっといける映画館をチェックしたい。そんな時に簡単に映画館を見つける事が出来ます。';
            // case 'policy': return ''
            // case 'rule' : return ''
          }
        }

        this.$modal.show('dialog', {
          title: '映画館MAPとは？',
          text: switchText(),
          buttons: [{
            title: '閉じる',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }, ]
        })
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
