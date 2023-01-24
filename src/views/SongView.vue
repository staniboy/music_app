<template>
  <main>
    <!-- Music Header -->
    <section class="w-full mb-8 py-14 text-center text-white relative">
      <div
        class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)"
      ></div>
      <div class="container mx-auto flex items-center">
        <!-- Play/Pause Button -->
        <button
          @click.prevent="newSong(song)"
          type="button"
          class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
        >
          <i class="fas fa-play"></i>
        </button>
        <div class="z-50 text-left ml-8">
          <!-- Song Info -->
          <div class="text-3xl font-bold">{{ song.modified_name }}</div>
          <div>{{ song.genre }}</div>
          <div class="song-price">{{ $n(1.5, "currency", "ru") }}</div>
        </div>
      </div>
    </section>
    <!-- Form -->
    <section class="container mx-auto my-4" id="comments">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">{{
            $t("song.comment_count", { count: song.comment_count })
          }}</span>
          <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <alert-message
            :show="alert.show"
            :color="alert.color"
            :message="alert.message"
          />
          <vee-form
            v-if="isLoggedIn"
            v-slot="{ handleSubmit }"
            @submit="addComment"
            :validation-schema="validation_schema"
          >
            <vee-field
              as="textarea"
              name="comment"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
              placeholder="Your comment here..."
              @keyup.ctrl.enter="handleSubmit(addComment)"
            ></vee-field>
            <vee-error class="text-red-600" name="comment" />
            <button
              :disabled="working"
              type="submit"
              class="py-1.5 px-3 rounded text-white bg-green-600 block"
            >
              Submit
            </button>
          </vee-form>
          <!-- Sort Comments -->
          <select
            v-model="sort"
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          >
            <option value="1">Latest</option>
            <option value="2">Oldest</option>
          </select>
        </div>
      </div>
    </section>
    <!-- Comments -->

    <ul class="container mx-auto flex flex-col gap-4">
      <li
        v-for="comment in sortedComments"
        :key="comment.id"
        class="p-6 bg-gray-50 border rounded border-gray-200"
      >
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">{{ comment.name }}</div>
          <time>{{ comment.datePosted }}</time>
        </div>

        <p>
          {{ comment.content }}
        </p>
      </li>
    </ul>
  </main>
</template>

<script>
import { songsCollection, commentsCollection, auth } from "@/includes/firebase";
import { mapState, mapActions } from "pinia";
import useUserStore from "@/stores/user";
import usePlayerStore from "@/stores/player";
import AlertMessage from "@/components/AlertMessage.vue";
export default {
  name: "SongView",
  components: { AlertMessage },
  data() {
    return {
      song: {},
      comments: [],
      sort: "1",
      validation_schema: {
        comment: "required|min:3|max:1000",
      },
      alert: {
        show: false,
        color: "bg-blue-500",
        message: "Please wait. Your comment is being submitted.",
      },
      working: false,
    };
  },
  async created() {
    const snapshot = await songsCollection.doc(this.$route.params.id).get();
    if (!snapshot.exists) {
      this.$router.push({ name: "home" });
      return;
    }

    const { s } = this.$route.query;
    this.sort = s === "1" || s === "2" ? s : "1";
    this.song = snapshot.data();
    this.getComments();
  },
  computed: {
    ...mapState(useUserStore, ["isLoggedIn"]),
    sortedComments() {
      return [...this.comments].sort((a, b) => {
        if (this.sort === "1") {
          return new Date(b.datePosted) - new Date(a.datePosted);
        }
        return new Date(a.datePosted) - new Date(b.datePosted);
      });
    },
  },
  methods: {
    ...mapActions(usePlayerStore, ["newSong"]),
    async addComment(values, { resetForm }) {
      this.working = true;
      this.alert = {
        show: true,
        color: "bg-blue-500",
        message: "Please wait. Your comment is being submitted.",
      };
      const comment = {
        content: values.comment,
        datePosted: new Date().toString(),
        sid: this.song.id,
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
      };

      await commentsCollection.add(comment); //TODO: handle errors
      this.song.comment_count += 1;
      await songsCollection
        .doc(this.song.id)
        .update({ comment_count: this.song.comment_count });

      this.getComments();
      this.working = false;
      this.alert = {
        show: true,
        color: "bg-green-500",
        message: "Comment posted!",
      };

      resetForm();
    },
    async getComments() {
      const snapshots = await commentsCollection
        .where("sid", "==", this.song.id)
        .get();
      this.comments = [];

      snapshots.forEach((doc) => {
        this.comments.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    },
  },
  watch: {
    sort(newVal) {
      if (newVal === this.$route.query.s) return;
      this.$router.push({
        query: {
          s: newVal,
        },
      });
    },
  },
};
</script>
