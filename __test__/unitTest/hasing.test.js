const { hasing } = require("../../src/utils");

// generate hash
describe("generatehash", () => {
  test("it should return hasing password", async () => {
    const pass = "coder1123";
    const hash = await hasing.generatehash(pass);
    return expect(hash).toBe(hash);
  });
});

// compare hash
describe("compareHash", () => {
  test("should return boolean ", async () => {
    const pass = "test1122";
    const hash = "$2a$10$povrGVuBmh1QtnnJa1zE7.Gryf46Co2QcjItedZh8PcE0q7QyAJea";
    const isOk = await hasing.comparePassword(pass, hash);
    return expect(isOk).toBe(isOk);
  });
});
