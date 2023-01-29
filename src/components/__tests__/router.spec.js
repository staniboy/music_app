import SongItem from "@/components/SongItem.vue";
import { RouterLinkStub, shallowMount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

describe("Router", () => {
  test("renders router link", () => {
    const song = {
      id: "01234",
    };

    const component = shallowMount(SongItem, {
      propsData: { song },
      global: {
        components: {
          "router-link": RouterLinkStub,
        },
      },
    });

    expect(component.findComponent(RouterLinkStub).props().to).toEqual({
      name: "song",
      params: { id: song.id },
    });
  });
});
