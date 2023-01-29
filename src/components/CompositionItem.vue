<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm" class="flex justify-between">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <div class="flex gap-1">
        <!-- Open Form -->
        <app-button color="green" @click="showForm = !showForm" class="h-8 w-8">
          <i class="fa fa-pencil-alt"></i>
        </app-button>
        <!-- Delete Button -->
        <app-button color="red" @click.prevent="deleteSong" class="h-8 w-8">
          <i class="fa fa-times"></i>
        </app-button>
      </div>
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
        <div class="flex gap-1">
          <!-- Edit Button -->
          <app-button :disabled="working" :type="'submit'" color="green">
            {{ $t("composition.submit") }}
          </app-button>
          <!-- Back Button -->
          <app-button
            color="gray"
            :disabled="working"
            @click.prevent="closeForm"
            >{{ $t("composition.back") }}
          </app-button>
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
    closeForm() {
      this.showForm = false;
      alert.show = false;
    },
  },
};
</script>
