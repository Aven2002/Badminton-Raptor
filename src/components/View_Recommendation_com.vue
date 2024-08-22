<template>
  <main class="content container">
    <!-- Breadcrumb -->
    <div class="d-flex flex-column flex-sm-row justify-content-start custom-breadcrumb mt-3">
      <Breadcrumb_Com
        :homeLink="'/Home_view'"
        :breadcrumbItems="[]"
        :currentItem="'Manage Recommendation'"
      />
    </div>
    <div class="row">
      <div class="col-md-12">
        <div v-if="loading" class="text-center">Loading...</div>
        <div v-else>
          <div v-if="items.length === 0" class="text-center">
            <img src="@/assets/Icon/Empty_Icon.png" alt="Empty Icon" class="img-fluid" />
          </div>
          <div v-else>
            <div class="table-responsive">
              <table class="table table-dark">
                <thead>
                  <tr>
                    <th scope="col">Recommendation ID</th>
                    <th scope="col">UserID</th>
                    <th scope="col">Category</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in paginatedItems"
                    :key="item.recommendationID"
                    :style="{
                      backgroundColor: item.status === 0 ? '#f8d7da' : '#d4edda',
                      color: item.status === 0 ? '#721c24' : '#155724', /* Adjust text color for readability */
                      borderRadius: '4px' /* Optional: Add border radius to improve appearance */
                    }"
                    @click="showRecommendationModal(item)"
                  >
                    <td>{{ item.recommendationID }}</td>
                    <td>{{ item.userID }}</td>
                    <td>{{ item.category }}</td>
                    <td>{{ item.rating }}</td>
                    <td @click.stop>
                      <div class="d-flex justify-content-center" style="gap: 20px;">
                        <RemoveButton :recommendationID="item.recommendationID" @item-removed="removeRecommendationFromList" @error="showErrorModal" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
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
    </div>

    <!-- Modals -->
    <div v-if="selectedRecommendation" :id="'recommendationModal' + selectedRecommendation.recommendationID" class="modal fade" tabindex="-1" aria-labelledby="recommendationModalLabel" aria-hidden="true">
      <RecommendationModal :recommendation="selectedRecommendation" />
    </div>
    <ErrorModal :errorMessage="errorMessage" />
  </main>
</template>


<script src='@/javascript/Admin/View_Recommendation'></script>

<style scoped>
/* Scoped styles can be added here if needed */
</style>
