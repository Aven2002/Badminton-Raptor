<template>
    <main class="content container">
      <div class="row">
        <!-- Filter Section -->
        <div class="col-md-3">
          <h2>Filters</h2>
          <div class="mb-4">
            <label for="category">Category</label>
            <select id="category" class="form-control" v-model="filter">
              <option value="">All Categories</option>
              <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="brand">Brand</label>
            <select id="brand" class="form-control" v-model="selectedBrand">
              <option value="">All Brands</option>
              <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="priceRange">Price Range</label>
            <input type="range" class="form-range" id="priceRange" v-model="priceRange" :min="minPrice" :max="maxPrice">
            <div>Price: RM{{ priceRange }}</div>
          </div>
        </div>
        <!-- Equipment Cards Section -->
        <div class="col-md-9">
          <h1>Browse Equipment</h1>
          <!-- Search Bar -->
          <div class="mb-4">
            <input 
              type="text" 
              v-model="searchQuery" 
              class="form-control search-bar" 
              placeholder="Search by equipment name" 
            />
          </div>
          <div v-if="loading" class="text-center">Loading...</div>
          <div v-else>
            <div v-if="filteredItems.length === 0" class="text-center">No items found.</div>
            <div class="row">
              <div class="col-md-4 mb-4" v-for="item in paginatedItems" :key="item.equipID">
                <div class="card-container">
                  <div class="card" @click="goToDetails(item.equipID)">
                    <div class="card-front">
                      <img class="card-img-top" :src="getImagePath(item.equipImgPath)" alt="Equipment Image">
                    </div>
                    <div class="card-back">
                      <h5 class="card-title">{{ item.equipName }}</h5>
                      <p class="card-text">Price: RM{{ item.equipPrice }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item" :class="{ disabled: currentPage === 1 }">
      <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)" aria-label="Previous">
        <i class="fas fa-chevron-left"></i>
        <span class="sr-only">Previous</span>
      </a>
    </li>
    <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
      <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
    </li>
    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
      <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)" aria-label="Next">
        <i class="fas fa-chevron-right"></i>
        <span class="sr-only">Next</span>
      </a>
    </li>
  </ul>
</nav>

          </div>
        </div>
      </div>
    </main>
</template>

<script src='@/javascript/Browse_Equipment.js'></script>

<style src='@/style/Browse_Equipment.css' scoped></style>
