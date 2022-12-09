<template>
  <!-- Alert Message -->
  <div
    v-if="registration.displayAlert"
    class="text-white text-center font-bold p-4 mb-4 rounded"
    :class="registration.cssClass"
  >
    {{ registration.alertMessage }}
  </div>
  <!-- Vee Form -->
  <vee-form
    :validation-schema="validationSchema"
    :initial-values="initialValues"
    @submit="register"
  >
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <vee-error class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <vee-error class="text-red-600" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <vee-error class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        name="confirm_password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <vee-error class="text-red-600" name="confirm_password" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antarctica">Antarctica</option>
      </vee-field>
      <vee-error class="text-red-600" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        name="tos"
        type="checkbox"
        value="1"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <label class="inline-block">Accept terms of service</label>
      <vee-error class="text-red-600 block" name="tos" />
    </div>
    <button
      type="submit"
      :disabled="registration.inProgress"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
import { auth, usersCollection } from "@/includes/firebase";
import { mapWritableState } from "pinia";
import useUserStore from "@/stores/user";
export default {
  name: "appRegistrationForm",
  data() {
    return {
      validationSchema: {
        name: "required|min:3|max:100|alpha_spaces",
        email: "required|min:3|max:100|email",
        age: "required|min_value:18|max_value:120",
        password: "required|min:9|max:100|excluded:password",
        confirm_password: "passwords_missmatch:@password",
        country: "required|country_excluded:Antarctica",
        tos: "tos",
      },
      initialValues: {
        country: "USA",
      },
      registration: {
        inProgress: false,
        displayAlert: false,
        cssClass: "bg-blue-500",
        alertMessage: "Please wait! Your account is being created",
      },
    };
  },
  computed: {
    ...mapWritableState(useUserStore, {
      userLoggedIn: "isLoggedIn",
    }),
  },
  methods: {
    async register(values) {
      this.registration.displayAlert = true;
      this.registration.inProgress = true;
      this.registration.cssClass = "bg-blue-500";
      this.registration.alertMessage =
        "Please wait! Your account is being created";

      let userCred = null;
      try {
        userCred = await auth.createUserWithEmailAndPassword(
          values.email,
          values.password
        );
        await usersCollection.add({
          name: values.name,
          email: values.email,
          age: values.age,
          country: values.country,
        });
      } catch (error) {
        this.registration.inProgress = false;
        this.registration.cssClass = "bg-red-500";
        this.registration.alertMessage =
          "An unexpected error occured. Please try again later.";
        return;
      }

      this.userLoggedIn = true;
      this.registration.cssClass = "bg-green-500";
      this.registration.alertMessage =
        "Success! Your account has been created.";
      console.log(userCred);
    },
  },
};
</script>
