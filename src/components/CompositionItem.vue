<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        @click="showForm = !showForm"
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showForm">
      <!-- Alert Message -->
      <div
        v-if="alert.displayAlert"
        class="text-white text-center font-bold p-4 mb-4 rounded"
        :class="alert.cssClass"
      >
        {{ alert.alertMessage }}
      </div>
      <vee-form
        :validation-schema="validationSchema"
        :initial-values="song"
        @submit="edit"
      >
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <vee-field
            name="modified_name"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
          />
          <vee-error class="text-red-600" name="modified_name" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <vee-field
            name="genre"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
          />
          <vee-error class="text-red-600" name="genre" />
        </div>
        <button
          :disabled="alert.inProgress"
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600"
        >
          Submit
        </button>
        <button
          :disabled="alert.inProgress"
          @click="showForm = false"
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
        >
          Go Back
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script>
import { songsCollection } from "@/includes/firebase";
export default {
  name: "CompositionItem",
  props: {
    index: {
      type: Number,
      required: true,
    },
    song: {
      type: Object,
      required: true,
    },
    updateSong: {
      type: Function,
      required: true,
    },
  },
  methods: {
    async edit(values) {
      this.alert.displayAlert = true;
      this.alert.inProgress = true;
      this.alert.cssClass = "bg-blue-500";
      this.alert.alertMessage = "Please wait! Updating song info.";

      try {
        await songsCollection.doc(this.song.id).update(values);
      } catch (error) {
        this.alert.inProgress = false;
        this.alert.cssClass = "bg-red-500";
        this.alert.alertMessage = "Something went wrong! Try again later.";
        return;
      }

      this.updateSong(this.index, values);

      this.alert.inProgress = false;
      this.alert.cssClass = "bg-green-500";
      this.alert.alertMessage = "Success!";
    },
  },
  data() {
    return {
      showForm: false,
      validationSchema: {
        modified_name: "required|max:100",
        genre: "alpha_spaces|max:100",
      },
      alert: {
        inProgress: false,
        displayAlert: false,
        cssClass: "bg-blue-500",
        alertMessage: "Please wait! Updating song info.",
      },
    };
  },
};
</script>
