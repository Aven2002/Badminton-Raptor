<template>
    <div class="modal fade" id="accountDetailsModal" tabindex="-1" aria-labelledby="accountModalLabel" aria-hidden="true">
     <div class="modal-dialog">
       <div class="modal-content">
         <div class="modal-header">
           <h5 class="modal-title" id="accountModalLabel">Account Details</h5>
         </div>
         <div class="modal-body">
           <p><strong>User ID:</strong> {{ account?.userID }}</p>
           <p><strong>User Role:</strong> {{ account?.userRole}}</p>
           <p><strong>Username:</strong> {{ account?.username }}</p>
           <p><strong>Name:</strong> {{ account?.fname }} {{ account?.lname }}</p>
           <p><strong>Age:</strong> {{ account?.age }}</p>
           <p><strong>Gender:</strong> {{ account?.gender}}</p>
           <p><strong>Race:</strong> {{ account?.race}}</p>
           <p><strong>Date of Birth:</strong> {{ new Date(account?.dob).toLocaleDateString('en-GB') }}</p>
           <p><strong>Email:</strong> {{ account?.email }}</p>
           <p><strong>Contact Number:</strong> {{ account?.contactNum }}</p>
           <p><strong>Created At:</strong> {{ new Date(account?.created_at).toLocaleString() }}</p>
         </div>
         <div class="modal-footer ">
           <button type="button" class="custom-button-danger" data-bs-dismiss="modal">Close</button>
         </div>
       </div>
     </div>
   </div>
 </template>
 
 
 <script>
 
 export default {
   name: 'accountDetailsModal',
   props: {
     account: {
       type: Object,
       default: null
     },
     showModal: {
       type: Boolean,
       default: false
     }
   },
 };
 </script>
