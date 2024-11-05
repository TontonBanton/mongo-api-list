export default {
  template: `
    <div id="ninja-container">
      <form id="search" @submit="handleSubmit">
        <input type="text" v-model="lat" placeholder="Latitude" required />
        <input type="text" v-model="lng" placeholder="Longitude" required />
        <input type="text" v-model="range" placeholder="Range" required/>
        <textarea type="text" v-model="origin" placeholder="Location" readonly />
        <input type="submit" value="Find It" />
      </form>
      <ul>
        <li v-for="(ninja, index) in ninjas" :key="index">
          <span :class="{ true: ninja.available, false: !ninja.available }"></span>
          <span style="font-weight: bold;">{{ ninja.name }}</span>
          <span>{{ ninja.rank }}</span>
          <span style="width: 8rem;">{{ ninja.geometry.coordinates }}</span>
          <span style="width: 13rem;">{{ ninja.country }}</span>
          <span v-if="ninja.distance !== undefined" style="width: 8rem;">
            {{ ninja.distance.toFixed(2) }} km
          </span>
          <span v-else>N/A km</span>
        </li>
      </ul>
    </div>
  `,

  setup() {
    const ninjas = Vue.ref([]);
    const lat = Vue.ref('');
    const lng = Vue.ref('');
    const range = Vue.ref('');
    const origin = Vue.ref('');
    const apiKey = '14ac98c0d4c64d8a831d50188a19d83c';

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res= await fetch(`/api/geocode/?lng=${lng.value}&lat=${lat.value}&range=${range.value}`);
        const fetchResult = await res.json();
        origin.value = fetchResult.location

        if (fetchResult.ninjas.length > 0) {
          // Fetch country for each ninja using geocoding
          const geocodePromises = fetchResult.ninjas.map(async (ninja) => {
            const [ninjaLng, ninjaLat] = ninja.geometry.coordinates;
            const geoResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${ninjaLat},${ninjaLng}&key=${apiKey}`);
            const country = geoResponse.data.results[0]?.formatted || 'Unknown Address';
            return { ...ninja, country }; // Add country to ninja object
          });
          // Wait for all geocoding requests to complete
          ninjas.value = await Promise.all(geocodePromises);
        } else {
          alert('Nothing in the area');
          ninjas.value = [];
        }

      } catch (error) {
        alert('Something is wrong...')
        console.error("Failed to fetch ninjas:", error);
      }
    };

    return {
      ninjas, lat,lng, range, origin,
      handleSubmit
    };
  }
};