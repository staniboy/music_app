<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">{{ $t("upload.upload") }}</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
        :class="{
          'bg-green-400 border-green-400 border-solid': isDragover,
        }"
        @drag.prevent.stop=""
        @drop.prevent.stop="upload($event)"
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="isDragover = false"
        @dragenter.prevent.stop="isDragover = true"
        @dragover.prevent.stop="isDragover = true"
        @dragleave.prevent.stop="isDragover = false"
      >
        <h5>{{ $t("upload.description") }}</h5>
      </div>
      <input type="file" multiple @change="upload($event)" />
      <hr class="my-6" />
      <!-- Progess Bars -->
      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <!-- File Name -->
        <div class="font-bold text-sm" :class="upload.text_class">
          <i :class="upload.icon"></i> {{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            class="transition-all progress-bar"
            :class="upload.variant"
            :style="{ width: upload.current_progress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage, auth, songsCollection } from "@/includes/firebase";
export default {
  name: "AppUpload",
  data() {
    return {
      isDragover: false,
      uploads: [],
    };
  },
  props: {
    addSong: {
      type: Function,
      required: true,
    },
  },
  methods: {
    upload(event) {
      const files = event.dataTransfer
        ? [...event.dataTransfer.files]
        : [...event.target.files];
      files.forEach((file) => {
        if (file.type !== "audio/mpeg") {
          return;
        }
        const storageRef = storage.ref(); // Root
        const songsRef = storageRef.child(`songs/${file.name}`); // File ref
        const task = songsRef.put(file);

        const uploadIndex =
          this.uploads.push({
            task,
            current_progress: 0,
            name: file.name,
            variant: "bg-blue-400",
            icon: "fas fa-spinner fa-spin",
            text_class: "",
          }) - 1;

        task.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploads[uploadIndex].current_progress = progress;
          },
          (error) => {
            this.uploads[uploadIndex].variant = "bg-red-400";
            this.uploads[uploadIndex].text_class = "text-red-400";
            this.uploads[uploadIndex].icon = "fas fa-times";
            console.log(error);
          },
          async () => {
            const song = {
              uid: auth.currentUser.uid,
              display_name: auth.currentUser.displayName,
              original_name: task.snapshot.ref.name,
              modified_name: task.snapshot.ref.name,
              genre: "", //TODO: look up genre in meta
              comment_count: 0,
            };

            song.url = await task.snapshot.ref.getDownloadURL();
            const songRef = await songsCollection.add(song);
            const songSnapshot = await songRef.get();
            this.addSong(songSnapshot);

            this.uploads[uploadIndex].variant = "bg-green-400";
            this.uploads[uploadIndex].text_class = "text-green-400";
            this.uploads[uploadIndex].icon = "fas fa-check";
          }
        );
      });
      this.isDragover = false;
    },
  },
  beforeUnmount() {
    this.uploads.forEach((upload) => {
      upload.task.cancel();
    });
  },
};
</script>
