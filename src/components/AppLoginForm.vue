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
    login(values) {
      this.alert.displayAlert = true;
      this.alert.inProgress = true;
      this.alert.cssClass = "bg-blue-500";
      this.alert.alertMessage = "Please wait! We are logging you in.";
      setTimeout(() => {
        this.alert.inProgress = false;
        this.alert.cssClass = "bg-green-500";
        this.alert.alertMessage = "Success! Your are logged in.";
        console.log(values);
      }, 3000);
    },
  },
};
</script>
