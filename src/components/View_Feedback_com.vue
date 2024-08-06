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
            <div class="table-responsive">
              <table class="table table-dark ">
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
                  <tr v-for="item in paginatedItems" :key="item.feedbackID">
                    <td>{{ item.feedbackID }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.contactNum }}</td>
                    <td>{{ item.feedbackCategory }}</td>
                    <td>
                      <div class="d-flex justify-content-center" style="gap: 20px;">
                        <RemoveButton :feedbackID="item.feedbackID" @error="showErrorModal" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination Controls -->
            <nav aria-label="Page navigation" class="mt-3">
              <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <a class="page-link" href="#" @click.prevent="currentPage = currentPage - 1">Previous</a>
                </li>
                <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
                  <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                  <a class="page-link" href="#" @click.prevent="currentPage = currentPage + 1">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <ErrorModal :errorMessage="errorMessage" />
  </main>
</template>

<script src='@/javascript/Admin/View_Feedback'></script>

<style> @import '@/style/Global_style.css'; </style>
