// describe("getPagination", () => {
//   it("should calculate pagination correctly for the first page", () => {
//     const totalItems = 50;
//     const limit = 10;
//     const page = 1;
//     const pagination = getPagination({ totalItems, limit, page });

const { generateToken } = require("./src/lib/token");
const { getPagination, getHateOasForAllItems } = require("./src/utils/query");

//     expect(pagination).toEqual({
//       page: 1,
//       limit: 10,
//       totalPages: 5,
//       totalItems: 50,
//       next: 2,
//     });
//   });

//   it("should calculate pagination correctly for an intermediate page", () => {
//     const totalItems = 50;
//     const limit = 10;
//     const page = 3;
//     const pagination = getPagination({ totalItems, limit, page });

//     expect(pagination).toEqual({
//       page: 3,
//       limit: 10,
//       totalPages: 5,
//       totalItems: 50,
//       prev: 2,
//       next: 4,
//     });
//   });

//   it("should calculate pagination correctly for the last page", () => {
//     const totalItems = 50;
//     const limit = 10;
//     const page = 5;
//     const pagination = getPagination({ totalItems, limit, page });

//     expect(pagination).toEqual({
//       page: 5,
//       limit: 10,
//       totalPages: 5,
//       totalItems: 50,
//       prev: 4,
//     });
//   });
// });

// // Mock the generateQueryString function
// jest.mock("../../utils/query", () => ({
//   generateQueryString: jest.fn(),
//   getPagination: jest.fn(),
// }));

// describe("getHateOasForAllItems", () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should generate links object with only self link when hasNext and hasPrev are false", () => {
//     const links = getHateOasForAllItems({});

//     expect(links).toEqual({
//       self: "/",
//     });
//     expect(generateQueryString).not.toHaveBeenCalled();
//     expect(getPagination).not.toHaveBeenCalled();
//   });

//   it("should generate links object with self and nextPage links when hasNext is true", () => {
//     generateQueryString.mockReturnValue("page=2");

//     const links = getHateOasForAllItems({
//       url: "/items",
//       path: "/items",
//       query: { page: 1 },
//       hasNext: true,
//       page: 1,
//     });

//     expect(links).toEqual({
//       self: "/items",
//       nextPage: "/items?page=2",
//     });
//     expect(generateQueryString).toHaveBeenCalledWith({
//       queryParams: { page: 1 },
//       page: 2,
//     });
//     expect(getPagination).toHaveBeenCalledWith({
//       totalItems: undefined,
//       limit: undefined,
//       page: 1,
//     });
//   });

//   it("should generate links object with self and prevPage links when hasPrev is true", () => {
//     generateQueryString.mockReturnValue("page=2");

//     const links = getHateOasForAllItems({
//       url: "/items",
//       path: "/items",
//       query: { page: 2 },
//       hasPrev: true,
//       page: 2,
//     });

//     expect(links).toEqual({
//       self: "/items",
//       prevPage: "/items?page=2",
//     });
//     expect(generateQueryString).toHaveBeenCalledWith({
//       queryParams: { page: 2 },
//       page: 1,
//     });
//     expect(getPagination).toHaveBeenCalledWith({
//       totalItems: undefined,
//       limit: undefined,
//       page: 2,
//     });
//   });
// });
const vol = {
  _id: new ObjectId("650be97434193d9394005fb1"),
};
console.log(vol._id.toString());
