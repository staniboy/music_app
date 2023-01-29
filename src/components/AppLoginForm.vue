<template>
  <!-- Alert Message -->
  <alert-message
    :show="alert.show"
    :color="alert.color"
    :message="alert.message"
  />
  <!--  Vee Form -->
  <vee-form :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("login-form.email") }}</label>
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
      <label class="inline-block mb-2">{{ $t("login-form.password") }}</label>
      <vee-field
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <vee-error class="text-red-600" name="password" />
    </div>
    <app-button
      :disabled="working"
      :type="'submit'"
      class="w-full bg-purple-400 hover:bg-purple-500"
      >{{ $t("login-form.login") }}</app-button
    >
  </vee-form>
</template>

<script>
import AlertMessage from "@/components/AlertMessage.vue";
import { mapActions } from "pinia";
import useUserStore from "@/stores/user";
export default {
  name: "appLoginForm",
  components: { AlertMessage },
  data() {
    return {
      loginSchema: {
        email: "required|email",
        password: "required|min:9|max:100",
      },
      alert: {
        show: false,
        color: "bg-blue-500",
        message: "Please wait! We are logging you in.",
      },
      working: false,
    };
  },
  methods: {
    ...mapActions(useUserStore, ["authenticate"]),
    async login(values) {
      this.working = true;
      this.alert.show = true;
      this.alert.color = "bg-blue-500";
      this.alert.message = "Please wait! We are logging you in.";
      try {
        await this.authenticate(values);
      } catch (error) {
        this.working = false;
        this.alert.color = "bg-red-500";
        this.alert.message = "Invalid login details!";
        return;
      }
      this.working = false;
      this.alert.color = "bg-green-500";
      this.alert.message = "Success! Your are logged in.";
      window.location.reload();
    },
  },
};
</script>
