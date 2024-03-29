import { defineStore } from "pinia";
import { Howl } from "howler";
import helper from "@/includes/helper";

export default defineStore("player", {
  state: () => ({
    currentSong: null,
    sound: {},
    seek: "00:00",
    duration: "00:00",
    progressBar: "0%",
  }),
  actions: {
    async newSong(song) {
      if (this.sound instanceof Howl) this.sound.unload();
      this.currentSong = song;

      this.sound = new Howl({
        src: [song.url],
        html5: true,
      });
      this.sound.on("play", () => requestAnimationFrame(this.progress));
      this.sound.on("seek", () => requestAnimationFrame(this.progress));
      this.sound.play();
    },
    async toggleAudio() {
      if (!this.sound.playing) return;
      this.sound.playing() ? this.sound.pause() : this.sound.play();
    },
    progress() {
      this.seek = helper.formatTime(this.sound.seek());
      this.duration = helper.formatTime(this.sound.duration());

      this.progressBar = `${
        (this.sound.seek() / this.sound.duration()) * 100
      }%`;

      if (this.sound.playing()) {
        requestAnimationFrame(this.progress);
      }
    },
    updateSeek(event) {
      if (!this.sound.playing) return;
      const { x, width } = event.currentTarget.getBoundingClientRect();

      const clientX = event.clientX - x;
      const percentage = clientX / width;
      const seconds = this.sound.duration() * percentage;
      this.sound.seek(seconds);
    },
  },
  getters: {
    playing: (state) => {
      if (state.sound.playing) return state.sound.playing();
      return false;
    },
  },
});
