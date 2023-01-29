<template>
  <div class="border border-gray-200 p-3 mb-4 rounded flex flex-col gap-3">
    <div class="flex justify-between align-middle">
      <div class="text-lg font-semibold self-center">
        {{ song.modified_name }}
      </div>
      <!-- Open Form -->
      <i
        @click="toggleForm"
        class="text-black self-center cursor-pointer fa"
        :class="[showForm ? 'fa-times' : 'fa-pencil-alt']"
      ></i>
    </div>
    <div v-show="showForm">
      <alert-message
        :show="alert.show"
        :color="alert.color"
        :message="alert.message"
      />
      <vee-form
        :validation-schema="validationSchema"
        :initial-values="song"
        @submit="edit"
      >
        <!-- Title -->
        <div class="mb-3">
          <label class="inline-block mb-2 text-sm font-semibold">
            {{ $t("composition.title") }}
          </label>
          <vee-field
            @input="updateUnsavedFlag(true)"
            name="modified_name"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
          />
          <vee-error class="text-red-600" name="modified_name" />
        </div>
        <!-- Genre -->
        <div class="mb-3">
          <label class="inline-block mb-2 text-sm font-semibold">
            {{ $t("composition.genre") }}
          </label>
          <vee-field
            @input="updateUnsavedFlag(true)"
            name="genre"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
          />
          <vee-error class="text-red-600" name="genre" />
        </div>
        <div class="flex gap-2">
          <!-- Edit Button -->
          <app-button
            :disabled="working"
            type="submit"
            class="bg-green-400 hover:bg-green-500"
          >
            {{ $t("composition.submit") }}
          </app-button>
          <!-- Delete Button -->
          <div
            @click.prevent="deleteSong"
            class="text-gray-500 font-semibold ml-auto cursor-pointer self-center px-2"
          >
            {{ $t("composition.delete") }}
          </div>
        </div>
      </vee-form>
    </div>
  </div>
</template>

<script>
import AlertMessage from "@/components/AlertMessage.vue";
import { songsCollection, storage } from "@/includes/firebase";
export default {
  name: "CompositionItem",
  components: { AlertMessage },
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
    removeSong: {
      type: Function,
      required: true,
    },
    updateUnsavedFlag: {
      type: Function,
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
        show: false,
        color: "bg-blue-500",
        message: "Please wait! Updating song info.",
      },
      working: false,
    };
  },
  methods: {
    async edit(values) {
      this.working = true;
      this.alert.show = true;
      this.alert.color = "bg-blue-500";
      this.alert.message = "Please wait! Updating song info.";

      try {
        await songsCollection.doc(this.song.id).update(values);
      } catch (error) {
        this.working = false;
        this.alert.color = "bg-red-500";
        this.alert.message = "Something went wrong! Try again later.";
        return;
      }

      this.updateSong(this.index, values);
      this.updateUnsavedFlag(false);

      this.working = false;
      this.alert.color = "bg-green-500";
      this.alert.message = "Success!";
    },
    async deleteSong() {
      const storageRef = storage.ref();
      const songRef = storageRef.child(`songs/${this.song.original_name}`);

      await songRef.delete();
      await songsCollection.doc(this.song.id).delete();
      this.removeSong(this.index);
    },
    toggleForm() {
      this.showForm = !this.showForm;
      this.alert.show = false;
    },
  },
};
</script>
<style></style>
