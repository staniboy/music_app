import { shallowMount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import HomeView from "@/views/HomeView.vue";
import SongItem from "@/components/SongItem.vue";

describe("HomeView.vue", () => {
  test("renders list of songs", () => {
    const songs = [{}, {}, {}];
    const component = shallowMount(HomeView, {
      data() {
        return {
          songs,
        };
      },
      global: {
        mocks: {
          $t: (message) => message,
        },
      },
    });

    const songComponents = component.findAllComponents(SongItem);

    expect(songComponents).toHaveLength(songs.length);

    songComponents.forEach((component, i) => {
      expect(component.props().song).toStrictEqual(songs[i]);
    });
  });
});
