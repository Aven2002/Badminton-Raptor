<template>
  <div>
    <button @click="goBack" class="custom-back-button mt-3 align-self-start">
      BACK <i class="fa-solid fa-arrow-right-to-bracket"></i>
    </button>
  </div>
</template>

  
  <script>
  export default {
    methods: {
      goBack() {
        this.$router.go(-1);
      }
    }
  }
  </script>
  
  <style scoped>
 .custom-back-button {
  --hover-bg: #444;
  --hover-text: #000;
  color: #680000;
  cursor: pointer;
  border: none;
  padding: 0.6em 1.0em;
  background: transparent;
  transition: 0.2s;
  font-size:18px;
  font-weight: 600;
}

.custom-back-button:hover {
  color: #dd9f9f;
  border-radius:20px;
  transform: translate(-0.25rem, -0.25rem);
  background: var(--hover-bg);
  box-shadow: 0.25rem 0.25rem var(--bg);
}

.custom-back-button:active {
  transform: translate(0);
  box-shadow: none;
}
  </style>
  
  
  