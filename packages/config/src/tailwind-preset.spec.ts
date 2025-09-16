import preset from "./tailwind-preset";

describe("tailwind preset", () => {
  it("exports an object with theme", () => {
    expect(preset).toBeDefined();
    // @ts-expect-error runtime check
    expect(typeof preset.theme).toBe("object");
  });
});
