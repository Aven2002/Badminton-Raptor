<template>
    <div>
      <main class="full-width-container  py-1">
        <div v-if="loading" class="text-center">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div v-else>
          <div v-if="equipment">
            <div class="row">
            <div class="d-flex justify-content-end">
              <BackBtn/>
            </div>
              <div class="d-flex justify-content-start align-items-center mb-2">
                <div class="row align-items-center mb-3">
                  <div class="col d-flex align-items-center">
                    <img :src="getBrandLogo(equipment.equipBrand)" alt="Brand Logo" class="brand-logo rounded shadow-lg" />
                    <h2 class="display-4">{{ equipment.equipName }}</h2>
                  </div>
                </div>
              </div>
              <!-- Left Section: Image -->
              <div class="col-md-4 d-flex flex-column align-items-center left-section position-relative">
                <img :src="getImagePath(equipment.equipImgPath)" alt="Equipment Image" class="img-fluid rounded shadow-lg" />
              </div>
  
              <!-- Right Section: Equipment Details and Favorite btn-->
              <div class="col-md-8">
                <div class="d-flex justify-content-between align-items-center mb-2 lead">
                <p><i class="fa-solid fa-sack-dollar"></i> RM{{ equipment.equipPrice.toFixed(2) }}</p>
                <Favorite_btn_com :equipID="equipment.equipID" class="favorite-btn" />
                </div>
                <!-- Additional Details Based on Category -->
                <div v-if="details" class="mt-3">
                  <div v-if="equipment.equipCategory === 'Racquet'" class="card card-dark mb-2">
                    <div class="card-body">
                      <ul class="list-group">
                        <li class="list-group-item"><strong>Flex:</strong> {{ details.flex }}</li>
                        <li class="list-group-item"><strong>Frame:</strong> {{ details.frame }}</li>
                        <li class="list-group-item"><strong>Shaft:</strong> {{ details.shaft }}</li>
                        <li class="list-group-item"><strong>Joint:</strong> {{ details.joint }}</li>
                        <li class="list-group-item"><strong>Length:</strong> {{ details.length }}</li>
                        <li class="list-group-item"><strong>Weight:</strong> {{ details.weight }}</li>
                        <li class="list-group-item"><strong>String Advice:</strong> {{ details.stringAdvice }}</li>
                        <li class="list-group-item"><strong>Color:</strong> {{ details.color }}</li>
                        <li class="list-group-item"><strong>Made In:</strong> {{ details.madeIn }}</li>
                      </ul>
                    </div>
                  </div>
                  <div v-if="equipment.equipCategory === 'Shuttlecock'" class="card card-dark mb-3">
                    <div class="card-body">
                      <ul class="list-group">
                        <li class="list-group-item"><strong>Quantity per Tube:</strong> {{ details.quantityPerTube }}</li>
                        <li class="list-group-item"><strong>Description:</strong> {{ details.description }}</li>
                      </ul>
                    </div>
                  </div>
                  <div v-if="equipment.equipCategory === 'Bags'" class="card card-dark mb-3">
                    <div class="card-body">
                      <ul class="list-group">
                        <li class="list-group-item"><strong>Color:</strong> {{ details.color }}</li>
                        <li class="list-group-item"><strong>Size:</strong> {{ details.size }}</li>
                        <li class="list-group-item"><strong>Description:</strong> {{ details.description }}</li>
                      </ul>
                    </div>
                  </div>
                  <div v-if="equipment.equipCategory === 'Footwear'" class="card card-dark mb-3">
                    <div class="card-body">
                      <ul class="list-group">
                        <li class="list-group-item"><strong>Color:</strong> {{ details.color }}</li>
                        <li class="list-group-item"><strong>Upper:</strong> {{ details.upper }}</li>
                        <li class="list-group-item"><strong>Midsole:</strong> {{ details.midsole }}</li>
                        <li class="list-group-item"><strong>Outsole:</strong> {{ details.outsole }}</li>
                        <li class="list-group-item"><strong>Description:</strong> {{ details.description }}</li>
                      </ul>
                    </div>
                  </div>
                  <div v-if="equipment.equipCategory === 'Apparel'" class="card card-dark mb-3">
                    <div class="card-body">
                      <ul class="list-group">
                        <li class="list-group-item"><strong>Color:</strong> {{ details.color }}</li>
                        <li class="list-group-item"><strong>Material:</strong> {{ details.material }}</li>
                      </ul>
                    </div>
                  </div>
                  <div v-if="equipment.equipCategory === 'Accessories'" class="card card-dark mb-3">
                    <div class="card-body">
                      <ul class="list-group">
                        <li class="list-group-item"><strong>Description:</strong> {{ details.description }}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script src='@/javascript/User/Equipment_Details.js'></script>
  
  <style src='@/style/User/Equipment_Details.css' scoped></style>
  