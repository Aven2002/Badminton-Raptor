<template>
  <main class="full-width-container ">
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
            <div class="table-container">
              <table class="custom-table-dark">
                <thead>
                  <tr>
                    <th scope="col">Recommendation ID</th>
                    <th scope="col">UserID</th>
                    <th scope="col">Equipment IDs</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Last Shown At</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in paginatedItems"
                    :key="item.recommendationID"
                    @click="selectRecommendation(item)"
                  >
                    <td>{{ item.recommendationID }}</td>
                    <td>{{ item.userID }}</td>
                    <td class="truncate">{{ item.equipment_ids }}</td>
                    <td>{{ item.rating }}</td>
                    <td>{{ item.last_shown_at }}</td>
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
    <RecommendationModal
      v-if="selectedRecommendation"
      :recommendation="selectedRecommendation"
      @close="selectedRecommendation = null"
    />
    <ErrorModal :errorMessage="errorMessage" />
  </main>
</template>

<script src='@/javascript/Admin/View_Recommendation.js'></script>

<style scoped>
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px; 
}
</style>
