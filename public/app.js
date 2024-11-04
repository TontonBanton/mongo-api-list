export default {
  template: `
    <div id="ninja-container">
      <form id="search" @submit="handleSubmit">
        <input type="text" v-model="lat" placeholder="Latitude" required />
        <input type="text" v-model="lng" placeholder="Longitude" required />
        <input type="text" v-model="range" placeholder="Range" required/>
        <input type="submit" value="Find Ninjas" />
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

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`/api/ninjas?lng=${lng.value}&lat=${lat.value}&range=${range.value}`);
        const fetchResult = await response.json();
        fetchResult.length === 0 ? alert('Nothing in the area') : (ninjas.value = fetchResult);
      } catch (error) {
        alert('Something is wrong...')
        console.error("Failed to fetch ninjas:", error);
      }
    };

    return {
      ninjas, lat,lng, range,
      handleSubmit
    };
  }
};