<template>
  <main class="full-width-container mt-1">
    <div class="row">
       <!-- Breadcrumb -->
      <div class="custom-breadcrumb">
        <Breadcrumb_Com
          :homeLink="'/Home_view'"
          :breadcrumbItems="[]"
          :currentItem="'Browse Equipment'"
        />
      </div>
      <!-- Filter Section -->
      <div class="col-md-3 mb-4 filters">
        <h2 class="filter-title">Filters</h2>
        <div class="mb-4">
          <label for="category" class="filter-label">Category</label>
          <select id="category" class="form-control" v-model="filter">
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="brand" class="filter-label">Brand</label>
          <select id="brand" class="form-control" v-model="selectedBrand">
            <option value="">All Brands</option>
            <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="priceRange" class="filter-label">Price Range</label>
          <input type="range" class="form-range" id="priceRange" v-model="priceRange" :min="minPrice" :max="maxPrice">
          <div class="filter-price">Price: RM{{ priceRange }}</div>
        </div>
      </div>
      <!-- Equipment Cards Section -->
      <div class="col-md-9">
        <!-- Search and Sort Bar -->
        <div class="d-flex justify-content-between align-items-center mb-4">
          <SearchBar_Com searchType="equipname" @search="updateSearchQuery" />
          <div class="d-flex align-items-center">
            <label for="sort" class="me-2 sort-label">Sort by:</label>
            <select id="sort" class="form-control w-auto" v-model="sortOrder">
              <option value="highest">Highest Price</option>
              <option value="lowest">Lowest Price</option>
            </select>
          </div>
        </div>
        <div v-if="loading" class="text-center">Loading...</div>
        <div v-else>
          <div v-if="filteredItems.length === 0" class="text-center">
            <img src='@/assets/Icon/Empty_Icon.png' alt="No items found" class="img-fluid" />
          </div>
          <div class="row">
            <div class="col-md-4 mb-4" v-for="item in paginatedItems" :key="item.equipID">
              <div class="card-container">
                <div class="card" @click="goToDetails(item.equipID)">
                  <div class="card-front">
                    <img class="card-img-top" :src="getImagePath(item.equipImgPath)" alt="Equipment Image">
                  </div>
                  <div class="card-back">
                    <h5 class>{{ item.equipName }}</h5>
                    <p class>Price: RM{{ item.equipPrice.toFixed(2) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
           <!-- Pagination Controls -->
          <Pagination
            :totalPages="totalPages"
            :currentPage="currentPage"
            @page-changed="handlePageChange"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script src='@/javascript/User/Browse_Equipment.js'></script>

<style src='@/style/User/Browse_Equipment.css' scoped></style>
