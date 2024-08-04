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
              <i :class="card.icon" class="fa-3x mb-3"></i>
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
        { id: 1, title: 'Manage Equipment', link: '/manage_equipment_view', icon: 'fa-solid fa-magnifying-glass' },
        { id: 2, title: 'Manage Account', link: '/manage_account_view', icon: 'fa-solid fa-users-gear' },
        { id: 3, title: 'Manage Feedback', link: '/manage_feedback_view', icon: 'fa-solid fa-comments' },
        { id: 4, title: 'Manage Equipment Recommendation', link: '/manage_recommendation_view', icon: 'fa-solid fa-folder-open' },
        { id: 5, title: 'Settings', link: '/settings_view', icon: 'fa-solid fa-gears' },
      ]
    };
  }
};
</script>


<style scoped>
h3{
  text-align: left;
  margin-left:50px;
  font-weight: bold;
  padding:20px;
}

.card {
  background-color: #1e1e1e;
  border: none;
  color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.card-title {
  margin-bottom: 0;
}
</style>
