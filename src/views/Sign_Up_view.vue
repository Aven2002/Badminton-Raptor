<template>
  <div class="signup-container">
    <!-- Container for pagination and back button -->
    <div class="d-flex justify-content-between align-items-center mb-3">
    <!-- Pagination -->
    <nav class="pagination-container">
      <ul class="pagination mb-0">
        <li :class="['page-item', { active: step === 1 }]">
          <a class="page-link" href="#" @click.prevent="goToStep(1)">
            Profile Img
          </a>
        </li>
        <li :class="['page-item', { active: step === 2, disabled: !isStep2Valid }]">
          <a class="page-link" href="#" @click.prevent="goToStep(2)">
            Account Details
          </a>
        </li>
        <li :class="['page-item', { active: step === 3, disabled: !isStep2Valid }]">
          <a class="page-link" href="#" @click.prevent="goToStep(3)">
            Verify
          </a>
        </li>
        <li :class="['page-item', { active: step === 4, disabled: !isStep4Valid }]">
          <a class="page-link" href="#" @click.prevent="goToStep(4)">
            Security Questions
          </a>
        </li>
      </ul>
    </nav>
    <div class="me-5">
      <!-- Back Button -->
      <BackBtn />
    </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow-lg">
          <div class="card-body">
            <form @submit.prevent="signUp">
              <!-- Section 1: Profile Image Selection -->
              <div v-if="step === 1">
                <h4>Select Profile Picture</h4>
                <div class="row">
                  <div class="col-12 mb-4 text-center">
                    <div class="card profile-card mx-auto">
                      <div class="card-body">
                        <img
                          :src="form.profileImg"
                          class="img-fluid rounded-circle"
                          alt="Profile Image"
                          id="big-profile-img"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-12 mb-4">
                    <div class="row justify-content-center">
                      <div
                        class="col-auto"
                        v-for="(img, index) in profileImgs"
                        :key="index"
                      >
                        <div class="card small-profile-card">
                          <div class="card-body text-center p-1">
                            <img
                              :src="img"
                              class="img-fluid rounded-circle selectable-profile-img"
                              @click="selectProfileImg(img)"
                              alt="Profile Image"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 text-center">
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="nextStep"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>

              <!-- Section 2: Account Info -->
<div v-else-if="step === 2">
  <h4>Fill Up Account Information</h4>
  <div class="row">
    <div class="col-md-6">
      <div class="mb-3">
        <label for="fname" class="form-label">First Name</label>
        <input
          type="text"
          class="form-control"
          id="fname"
          v-model="form.fname"
          required
        />
        <div v-if="errors.fname" class="text-danger">
          {{ errors.fname }}
        </div>
      </div>
      <div class="mb-3">
        <label for="lname" class="form-label">Last Name</label>
        <input
          type="text"
          class="form-control"
          id="lname"
          v-model="form.lname"
          required
        />
        <div v-if="errors.lname" class="text-danger">
          {{ errors.lname }}
        </div>
      </div>
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input
          type="text"
          class="form-control"
          id="username"
          v-model="form.username"
          required
        />
        <div v-if="errors.username" class="text-danger">
          {{ errors.username }}
        </div>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="form.email"
          required
        />
        <div v-if="errors.email" class="text-danger">
          {{ errors.email }}
        </div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <div class="input-group">
          <input
            :type="passwordFieldType"
            class="form-control"
            id="password"
            v-model="form.password"
            required
          />
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="togglePasswordVisibility"
          >
            <i :class="['bi', passwordToggleIcon]"></i>
          </button>
          <div v-if="errors.password" class="text-danger">
            {{ errors.password }}
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="mb-3">
        <label for="gender" class="form-label">Gender</label>
        <select
          class="form-control"
          id="gender"
          v-model="form.gender"
          required
        >
          <option>Male</option>
          <option>Female</option>
          <option>Not Specify</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="race" class="form-label">Race</label>
        <select
          class="form-control"
          id="race"
          v-model="form.race"
          required
        >
          <option>Chinese</option>
          <option>Malay</option>
          <option>Indian</option>
          <option>Other</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="contactNumber" class="form-label">Contact Number</label>
        <input
          type="text"
          class="form-control"
          id="contactNumber"
          v-model="form.contactNum"
          required
        />
        <div v-if="errors.contactNum" class="text-danger">
          {{ errors.contactNum }}
        </div>
      </div>
      <div class="mb-3">
        <label for="dob" class="form-label">Date of Birth</label>
        <input
          type="date"
          class="form-control"
          id="dob"
          v-model="form.dob"
          required
        />
        <div v-if="errors.dob" class="text-danger">
          {{ errors.dob }}
        </div>
      </div>
      <!-- Move the button inside the same column as input fields -->
      <div class="mb-3">
        <button
          type="button"
          class="btn btn-primary"
          @click="nextStep"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</div>


              <!-- Section 3: Confirm and Submit -->
              <div v-else-if="step === 3">
                <h4>Verify Account Information</h4>
                <div class="row">
                  <div class="col-12">
                    <div class="card profile-card mx-auto mb-3">
                      <div class="card-body text-center">
                        <img
                          :src="form.profileImg"
                          class="img-fluid rounded-circle"
                          alt="Profile Image"
                          id="big-profile-img"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <!-- Left Side -->
                      <div class="col-md-6">
                        <ul class="list-group mb-3">
                          <li class="list-group-item">
                            <strong class="label">First Name:</strong>
                            <span class="value">{{ form.fname }}</span>
                          </li>
                          <li class="list-group-item">
                            <strong class="label">Last Name:</strong>
                            <span class="value">{{ form.lname }}</span>
                          </li>
                          <li class="list-group-item">
                            <strong class="label">Username:</strong>
                            <span class="value">{{ form.username }}</span>
                          </li>
                          <li class="list-group-item">
                            <strong class="label">Email:</strong>
                            <span class="value">{{ form.email }}</span>
                          </li>
                          <li class="list-group-item">
                            <strong class="label">Password:</strong>
                            <span class="value">{{ form.password }}</span>
                          </li>
                        </ul>
                      </div>
                      <!-- Right Side -->
                      <div class="col-md-6">
                        <ul class="list-group mb-3">
                          <li class="list-group-item">
                            <strong class="label">Gender:</strong>
                            <span class="value">{{ form.gender }}</span>
                          </li>
                          <li class="list-group-item">
                            <strong class="label">Race:</strong>
                            <span class="value">{{ form.race }}</span>
                          </li>
                          <li class="list-group-item">
                            <strong class="label">Contact Number:</strong>
                            <span class="value">{{ form.contactNum }}</span>
                          </li>
                          <li class="list-group-item">
                            <strong class="label">Date of Birth:</strong>
                            <span class="value">{{ form.dob }}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6 text-center">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      @click="goToStep(2)"
                    >
                      Back
                    </button>
                  </div>
                  <div class="col-6 text-center">
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="nextStep"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>

              <!-- Section 4: Security Questions -->
              <div v-else-if="step === 4">
                <h4>Security Questions</h4>
                <div class="row">
                  <div class="col-md-12">
                    <!-- Question 1 -->
                    <div class="row mb-3">
                      <div class="col-md-6">
                        <label for="question1" class="form-label"
                          >Select Question 1</label
                        >
                        <select
                          class="form-control"
                          id="question1"
                          v-model="form.securityQuestions[0]"
                          required
                        >
                          <option
                            v-for="q in getAvailableQuestions(0)"
                            :key="q.question"
                            :value="q.question"
                          >
                            {{ q.question }}
                          </option>
                        </select>
                      </div>
                      <div class="col-md-6">
                        <label for="answer1" class="form-label">Answer 1</label>
                        <input
                          type="text"
                          class="form-control"
                          id="answer1"
                          v-model="form.answers[0]"
                          required
                        />
                      </div>
                    </div>

                    <!-- Question 2 -->
                    <div class="row mb-3">
                      <div class="col-md-6">
                        <label for="question2" class="form-label"
                          >Select Question 2</label
                        >
                        <select
                          class="form-control"
                          id="question2"
                          v-model="form.securityQuestions[1]"
                          required
                        >
                          <option
                            v-for="q in getAvailableQuestions(1)"
                            :key="q.question"
                            :value="q.question"
                          >
                            {{ q.question }}
                          </option>
                        </select>
                      </div>
                      <div class="col-md-6">
                        <label for="answer2" class="form-label">Answer 2</label>
                        <input
                          type="text"
                          class="form-control"
                          id="answer2"
                          v-model="form.answers[1]"
                          required
                        />
                      </div>
                    </div>

                    <!-- Question 3 -->
                    <div class="row mb-3">
                      <div class="col-md-6">
                        <label for="question3" class="form-label"
                          >Select Question 3</label
                        >
                        <select
                          class="form-control"
                          id="question3"
                          v-model="form.securityQuestions[2]"
                          required
                        >
                          <option
                            v-for="q in getAvailableQuestions(2)"
                            :key="q.question"
                            :value="q.question"
                          >
                            {{ q.question }}
                          </option>
                        </select>
                      </div>
                      <div class="col-md-6">
                        <label for="answer3" class="form-label">Answer 3</label>
                        <input
                          type="text"
                          class="form-control"
                          id="answer3"
                          v-model="form.answers[2]"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6 text-center">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      @click="goToStep(3)"
                    >
                      Back
                    </button>
                  </div>
                  <div class="col-6 text-center">
                    <button
                      type="button"
                      class="btn btn-primary"
                      :disabled="!isStep4Valid"
                      @click="signUp"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <ErrorModal :errorMessage="errorMessage" />
    <SuccessModal :successMessage="successMessage" />
  </div>
</template>

<script src="@/javascript/Sign_Up.js"></script>

<style src="@/style/Sign_Up.css" scoped></style>
