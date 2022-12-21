<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <app-upload :addSong="addSong" />
      </div>
      <div class="col-span-2">
        <div
          class="bg-white rounded border border-gray-200 relative flex flex-col"
        >
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i
              class="fa fa-compact-disc float-right text-green-400 text-2xl"
            ></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <composition-item
              v-for="(song, i) in songs"
              :key="song.id"
              :index="i"
              :song="song"
              :updateSong="updateSong"
              :removeSong="removeSong"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import AppUpload from "@/components/AppUpload.vue";
import CompositionItem from "@/components/CompositionItem.vue";
import { songsCollection, auth } from "@/includes/firebase";
export default {
  name: "ManageView",
  components: { AppUpload, CompositionItem },
  data() {
    return {
      songs: [],
    };
  },
  async created() {
    const snapshot = await songsCollection
      .where("uid", "==", auth.currentUser.uid)
      .get();
    snapshot.forEach(this.addSong);
  },
  methods: {
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name;
      this.songs[i].genre = values.genre;
    },
    addSong(document) {
      const song = {
        id: document.id,
        ...document.data(),
      };
      this.songs.push(song);
    },
    removeSong(i) {
      this.songs.splice(i, 1);
    },
  },
};
</script>
