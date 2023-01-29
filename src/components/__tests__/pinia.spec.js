import { createPinia, setActivePinia } from "pinia";
import { beforeEach, test, describe, expect, vi } from "vitest";
import useUserStore from "@/stores/user";

vi.mock("@/includes/firebase", () => ({
  auth: {
    signInWithEmailAndPassword: () => Promise.resolve(),
  },
}));

describe("stores", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("authenticates user", async () => {
    const store = useUserStore();

    expect(store.isLoggedIn).toBe(false);
    await store.authenticate({});
    expect(store.isLoggedIn).toBe(true);
  });
});
