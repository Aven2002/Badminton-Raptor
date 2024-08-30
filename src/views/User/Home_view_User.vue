<template>
  <div class="home">
    <h3>Explore Our Key Services</h3>
  </div>

  <div class="container mt-5 card-container">
    <div class="row">
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" v-for="card in cards" :key="card.id">
        <router-link :to="card.link" class="text-decoration-none">
          <div class="card text-center h-100">
            <div class="card-body d-flex flex-column align-items-center justify-content-center">
              <i :class="card.icon" class="fa-4x mb-3"></i>
              <h5 class="card-title">{{ card.title }}</h5>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home_view",
  data() {
    return {
      cards: [
        { id: 1, title: 'Browse Equipment', link: '/browse_equipment_view', icon: 'fa-solid fa-magnifying-glass' },
        { id: 2, title: 'Compare Equipment', link: '/compare_equipment_view', icon: 'fa-solid fa-code-compare' },
        { id: 3, title: 'Personalized Recommendation', link: '/equipment_recommendation_view', icon: 'fa-solid fa-person' },
        { id: 4, title: 'Settings', link: '/settings_view', icon: 'fa-solid fa-gears' },
        { id: 5, title: 'Favorite List', link: '/favorite_list_view', icon: 'fa-solid fa-star' },
        { id: 6, title: 'Contact Us', link: '/contact_us_view', icon: 'fa-solid fa-comment-dots' },
        { id: 6, title: 'ChatBox', link: '/chatbox_view', icon: 'fa-solid fa-robot' }
      ]
    };
  }
};
</script>

<style scoped>
.home {
  text-align: center;
  margin-bottom: 40px;
}

h3 {
  font-weight: 800;
  text-align: left;
  margin: 25px 50px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  background-color: #2e2e2e;
  border-radius: 12px;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6);
}

.card-body {
  padding: 20px;
}

.card-title {
  font-weight: 600;
  color: #ffffff;
}

.fa-4x {
  color: #4484c0; /* Bright color for icons */
  transition: color 0.3s;
}

.card:hover .fa-4x {
  color: #ffffff; /* Icon color change on hover */
}
</style>
