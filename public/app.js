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
          <span>{{ ninja.name }}</span>
          <span>{{ ninja.rank }}</span>
          <span v-if="ninja.distance !== undefined">
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

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        //const response = await fetch(`/api/geocode?lng=${lng.value}&lat=${lat.value}&range=${range.value}`);
        const response = await fetch(`/api/geocode/?lng=${lng.value}&lat=${lat.value}&range=${range.value}`);
        const fetchResult = await response.json();

        console.log('fetched', fetchResult)
        fetchResult.ninjas.length> 0 ? (ninjas.value = fetchResult.ninjas): alert('Nothing in the area');

        origin.value = fetchResult.location
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