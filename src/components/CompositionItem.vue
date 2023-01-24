<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <button
        @click.prevent="deleteSong"
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
        <div class="mb-3">
          <label class="inline-block mb-2">
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
        <div class="mb-3">
          <label class="inline-block mb-2">
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
        <button
          :disabled="working"
          type="submit"
          class="py-1.5 px-3 mr-1 rounded text-white bg-green-600"
        >
          {{ $t("composition.submit") }}
        </button>
        <button
          :disabled="working"
          @click.prevent="
            () => {
              showForm = false;
              alert.show = false;
            }
          "
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
        >
          {{ $t("composition.back") }}
        </button>
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
  },
};
</script>
