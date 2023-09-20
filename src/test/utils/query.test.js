const {
  generateQueryString,
  getPagination,
  getHateOasForAllItems,
} = require("../../utils/query");

describe("generateQueryString", () => {
  it("should generate a valid query string for a single key-value pair", () => {
    const queryParams = { key: "value" };
    const queryString = generateQueryString({ queryParams });

    expect(queryString).toBe("key=value");
  });

  it("should generate a valid query string for multiple key-value pairs", () => {
    const queryParams = { key1: "value1", key2: "value2", key3: "value3" };
    const queryString = generateQueryString({ queryParams });

    expect(queryString).toBe("key1=value1&key2=value2&key3=value3");
  });

  it("should handle special characters in keys and values", () => {
    const queryParams = { "special#key": "special=value@123" };
    const queryString = generateQueryString({ queryParams });

    expect(queryString).toBe("special%23key=special%3Dvalue%40123");
  });

  it("should handle empty query parameters", () => {
    const queryParams = {};
    const queryString = generateQueryString({ queryParams });

    expect(queryString).toBe("");
  });

  it("should handle undefined query parameters", () => {
    expect(() => generateQueryString({})).toThrowError(
      "Cannot convert undefined or null to object"
    );
  });
});

describe("getPagination", () => {
  const defaults = {
    page: 1,
    limit: 10,
    totalItems: 0,
  };
  it("should calculate pagination for the first page", () => {
    const page = 1;
    const pagination = getPagination({ page });
    expect(pagination).toEqual({
      page: 1,
      limit: defaults.limit,
      totalPages: 0,
      totalItems: defaults.totalItems,
    });
  });

  it("should calculate pagination for an intermediate page", () => {
    const page = 5;
    const pagination = getPagination({ page });
    expect(pagination).toEqual({
      page: 5,
      limit: 10,
      totalPages: 0,
      totalItems: 0,
      prev: 4,
    });
  });

  it("should calculate pagination for an intermediate page", () => {
    const page = 5;
    const pagination = getPagination({ page, limit: 2 });
    expect(pagination).toEqual({
      page: 5,
      limit: 2,
      totalPages: 0,
      totalItems: 0,
      prev: 4,
    });
  });

  it("should calculate pagination for an intermediate page", () => {
    const pagination = getPagination({ page: 1, totalItems: 10, limit: 5 });
    expect(pagination).toEqual({
      page: 1,
      limit: 5,
      totalPages: 2,
      totalItems: 10,
      next: 2,
    });
  });
});

describe("getHateOasForAllItems", () => {
  it("should generate links object without prevPage and nextPage", () => {
    const links = getHateOasForAllItems({});
    expect(links).toEqual({
      self: "/",
    });
  });

  it("should generate links object with prevPage", () => {
    const links = getHateOasForAllItems({
      hasNext: true,
      path: "/items",
      query: { sort: "name" },
      page: 1,
    });
    expect(links).toEqual({
      self: "/items",
      nextPage: "/items?sort=name&page=2",
    });
  });

  it("should generate links object with prevPage", () => {
    const links = getHateOasForAllItems({
      hasNext: true,
      path: "/items",
      query: {
        sortType: "dsc",
        sortBy: "updatedAt",
        search: "",
        page: 1,
        limit: 10,
      },
      page: 1,
    });
    expect(links).toEqual({
      self: "/items",
      nextPage:
        "/items?sortType=dsc&sortBy=updatedAt&search=&page=1&limit=10&page=2",
    });
  });
});
