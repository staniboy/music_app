<template>
  <!-- Player -->
  <div
    class="fixed bottom-0 left-0 bg-white px-4 py-2 w-full"
    v-if="currentSong"
  >
    <!-- Track Info -->
    <div class="text-center">
      <span class="song-title font-bold">{{ currentSong.modified_name }}</span>
      by
      <span class="song-artist">{{ currentSong.display_name }}</span>
    </div>
    <div class="flex flex-nowrap gap-4 items-center">
      <!-- Play/Pause Button -->
      <button type="button" @click.prevent="toggleAudio" id="player-play-btn">
        <i
          class="fa text-gray-500 text-xl"
          :class="{ 'fa-play': !playing, 'fa-pause': playing }"
        ></i>
      </button>
      <!-- Current Position -->
      <div class="player-currenttime">{{ seek }}</div>
      <!-- Scrub Container  -->
      <div
        class="w-full h-2 rounded bg-gray-200 relative cursor-pointer"
        @click.prevent="updateSeek"
      >
        <!-- Player Ball -->
        <span
          class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg"
          :style="{ left: progressBar }"
        >
          <i class="fas fa-circle"></i>
        </span>
        <!-- Player Progress Bar-->
        <span
          class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
          :style="{ width: progressBar }"
        ></span>
      </div>
      <!-- Duration -->
      <div class="player-duration">{{ duration }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import usePlayerStore from "@/stores/player";
export default {
  name: "AppPlayer",
  methods: {
    ...mapActions(usePlayerStore, ["toggleAudio", "updateSeek"]),
  },
  computed: {
    ...mapState(usePlayerStore, [
      "playing",
      "seek",
      "duration",
      "progressBar",
      "currentSong",
    ]),
  },
};
</script>
