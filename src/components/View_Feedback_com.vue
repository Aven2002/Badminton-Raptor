<template>
  <main class="content container">
    <!-- Breadcrumb -->
    <div class="d-flex flex-column flex-sm-row justify-content-start custom-breadcrumb mt-3">
      <Breadcrumb_Com
        :homeLink="'/Home_view'"
        :breadcrumbItems="[]"
        :currentItem="'Manage Feedback'"
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
                    <th scope="col">Feedback ID</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact Number</th>
                    <th scope="col">Category</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in paginatedItems"
                    :key="item.feedbackID"
                    @click="showFeedbackModal(item)"
                  >
                    <td>{{ item.feedbackID }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.contactNum }}</td>
                    <td>{{ item.feedbackCategory }}</td>
                    <td @click.stop>
                      <div class="d-flex justify-content-center" style="gap: 20px;">
                        <RemoveButton :feedbackID="item.feedbackID" @item-removed="removeFeedbackFromList" @error="showErrorModal" />
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
    <FeedbackModal :feedback="selectedFeedback" />
    <ErrorModal :errorMessage="errorMessage" />
  </main>
</template>

<script src='@/javascript/Admin/View_Feedback'></script>

<style scoped>
/* Scoped styles can be added here if needed */
</style>
