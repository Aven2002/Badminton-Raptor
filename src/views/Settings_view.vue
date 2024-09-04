<template>
  <div class="container mt-3">
    <!-- Breadcrumb -->
    <div class="d-flex justify-content-between align-items-center">
      <Breadcrumb_Com
        :homeLink="'/Home_view'"
        :breadcrumbItems="[]"
        :currentItem="'Settings'"
      />
    </div>
    <div class="card bg-dark text-light">
      <!-- Top Section -->
      <div class="card-header">
        <div class="header">
          <h4>My Profile</h4>
          <p class="user-id">ID: {{ formattedUserID }}</p>
        </div>
      </div>

      <!-- Profile Information -->
      <div class="card-body">
        <div class="row">
          <!-- Left Side: Profile Image -->
          <div class="col-md-4 text-center mb-4">
            <div class="profile-img-container">
              <img
                :src="
                  user.profileImg ||
                  require('@/assets/Profile_Img/Profile_Img_Default.png')
                "
                class="img-fluid rounded-circle"
                alt="Profile Image"
              />
            </div>
            <button
              v-if="!editingProfileImage"
              type="button"
              class="btn btn-outline-light mt-3"
              @click="editingProfileImage = true"
            >
              Edit Profile Image
            </button>
            <div v-if="editingProfileImage">
              <div
                v-for="img in profileImages"
                :key="img"
                class="profile-img-option"
                @click="selectProfileImage(img)"
              >
                <img
                  :src="img"
                  class="img-thumbnail"
                  alt="Profile Image Option"
                />
              </div>
              <button
                type="button"
                class="btn btn-secondary mt-3"
                @click="editingProfileImage = false"
              >
                Cancel
              </button>
            </div>
            <!-- Display Validation Errors -->
            <div
              v-if="Object.keys(errors).length"
              class="alert alert-danger mt-5 errorValidationMessage"
            >
              <ul>
                <li v-for="(error, field) in errors" :key="field">
                  {{ error }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Right Side: User Info -->
          <div class="col-md-8">
            <!-- Single 'Edit' Button -->
            <div class="d-flex justify-content-end mb-3">
              <button
                type="button"
                class="btn btn-edit"
                @click="toggleEditMode"
              >
                <i class="fa-regular fa-pen-to-square"></i>
                {{ editMode ? "Cancel" : "Edit" }}
              </button>
            </div>

            <form @submit.prevent="updateProfile">
              <div class="row">
                <div
  class="col-md-6 mb-3"
  v-for="(field, index) in fields"
  :key="index"
>
  <label :for="field.key" class="form-label">
    {{ field.label }}:
  </label>

  <div v-if="editMode">
    <template v-if="field.type === 'select'">
      <select
        :id="field.key"
        class="form-select"
        v-model="user[field.key]"
        :class="{
          'field-username-email': field.key === 'username' || field.key === 'email',
          'edit-mode': editMode
        }"
        :disabled="field.key === 'username' || field.key === 'email'"
      >
        <option
          v-for="option in field.options"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </template>
    <template v-else>
      <input
        :type="field.type"
        :id="field.key"
        class="form-control"
        v-model="user[field.key]"
        :class="{
          'field-username-email': field.key === 'username' || field.key === 'email',
          'edit-mode': editMode
        }"
        :disabled="field.key === 'username' || field.key === 'email'"
      />
    </template>
  </div>

  <div v-else>
    <p class="form-control-plaintext">
      {{
        field.key === "dob"
          ? formatDate(user[field.key])
          : user[field.key]
      }}
    </p>
  </div>
</div>

              </div>

              <!-- Update Button Only in Edit Mode -->
              <button v-if="editMode" type="submit" class="btn btn-update">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <ErrorModal :errorMessage="errorMessage" />
    <SuccessModal :successMessage="successMessage" />
  </div>
</template>

<script src="@/javascript/Settings.js"></script>

<style src="@/style/Settings.css" scoped></style>
