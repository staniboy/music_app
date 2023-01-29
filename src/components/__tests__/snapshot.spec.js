import SongItem from "@/components/SongItem.vue";
import { RouterLinkStub, shallowMount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
describe("Snapshots SongItem.vue", () => {
  test("renders correctly", () => {
    const song = {
      id: "01234",
      modified_name: "modified_name_test",
      display_name: "display_name_test",
      comment_count: 69,
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

    expect(component.element).toMatchSnapshot();
  });
});
