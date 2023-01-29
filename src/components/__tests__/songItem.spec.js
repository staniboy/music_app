import SongItem from "@/components/SongItem.vue";
import { RouterLinkStub, shallowMount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

describe("SongItem.vue", () => {
  test("render song.display_name", () => {
    const song = {
      display_name: "test",
    };
    const wrapper = shallowMount(SongItem, {
      propsData: {
        song,
      },
      global: {
        components: {
          "router-link": RouterLinkStub,
        },
      },
    });

    const displayName = wrapper.find(".display_name");
    expect(displayName.text()).toBe(song.display_name);
  });
  test("render song.id in id attribute", () => {
    const song = {
      id: "123",
    };
    const component = shallowMount(SongItem, {
      propsData: {
        song,
      },
      global: {
        components: {
          "router-link": RouterLinkStub,
        },
      },
    });

    expect(component.attributes().id).toBe(`song-id-${song.id}`);
  });
});
