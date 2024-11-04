export default {
  template: `
    <div id="ninja-container">
      <form id="search" @submit="handleSubmit">
        <input type="text" v-model="lat" placeholder="Latitude" required />
        <input type="text" v-model="lng" placeholder="Longitude" required />
        <input type="submit" value="Find Ninjas" />
      </form>
      <ul>
        <li v-for="(ninja, index) in ninjas" :key="index">
          <span>{{ ninja.available ? 'Available' : 'N/A' }}</span>
          <span>{{ ninja.name }}</span>
          <span>{{ ninja.rank }}</span>
          <span v-if="ninja.dis !== undefined">
            {{ Math.floor(Number(ninja.dis) / 1000) }} km
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

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`/api/ninjas?lng=${lng.value}&lat=${lat.value}`);
        const fetchResult = await response.json();
        fetchResult.length === 0 ? alert('Nothing in the area') : (ninjas.value = fetchResult);
      } catch (error) {
        console.error("Failed to fetch ninjas:", error);
      }
    };

    return {
      ninjas, lat,lng,
      handleSubmit
    };
  }
};