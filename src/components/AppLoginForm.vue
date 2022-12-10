<template>
  <!-- Alert Message -->
  <div
    v-if="alert.displayAlert"
    class="text-white text-center font-bold p-4 mb-4 rounded"
    :class="alert.cssClass"
  >
    {{ alert.alertMessage }}
  </div>
  <!--  Vee Form -->
  <vee-form :validation-schema="loginSchema" @submit="login">
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
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <vee-error class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      :disabled="alert.inProgress"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
import { mapActions } from "pinia";
import useUserStore from "@/stores/user";
export default {
  name: "appLoginForm",
  data() {
    return {
      loginSchema: {
        email: "required|email",
        password: "required|min:9|max:100",
      },
      alert: {
        inProgress: false,
        displayAlert: false,
        cssClass: "bg-blue-500",
        alertMessage: "Please wait! We are logging you in.",
      },
    };
  },
  methods: {
    ...mapActions(useUserStore, ["authenticate"]),
    async login(values) {
      this.alert.displayAlert = true;
      this.alert.inProgress = true;
      this.alert.cssClass = "bg-blue-500";
      this.alert.alertMessage = "Please wait! We are logging you in.";
      try {
        await this.authenticate(values);
      } catch (error) {
        this.alert.inProgress = false;
        this.alert.cssClass = "bg-red-500";
        this.alert.alertMessage = "Invalid login details!";
        return;
      }
      this.alert.inProgress = false;
      this.alert.cssClass = "bg-green-500";
      this.alert.alertMessage = "Success! Your are logged in.";
      window.location.reload();
    },
  },
};
</script>
