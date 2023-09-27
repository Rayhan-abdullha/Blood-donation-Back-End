const { errors } = require("../../src/utils"); // Replace with the actual path to your notFound module

// not found
describe("notFound", () => {
  it("should use the default message and code if none are specified", () => {
    const error = errors.notFound("hello error");
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(error.message);
    expect(error.status).toBe(error.status);
  });
});

// bad request
describe("BadRequest", () => {
  it("should use the default message and code if none are specified", () => {
    const error = errors.BadRequest();
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(error.message);
    expect(error.status).toBe(error.status);
  });
});

// authenticationError
describe("authenticationError", () => {
  it("should use the default message and code if none are specified", () => {
    const error = errors.authenticationError();
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(error.message);
    expect(error.status).toBe(401);
  });
});

// authorizetionError
describe("authorizetionError", () => {
  it("should use the default message and code if none are specified", () => {
    const error = errors.authorizetionError();
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(error.message);
    expect(error.status).toBe(403);
  });
});

// serverError
describe("serverError", () => {
  it("should use the default message and code if none are specified", () => {
    const error = errors.serverError();
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(error.message);
    expect(error.status).toBe(500);
  });
});

// validation error schemaErrorSimplified
describe("schemaErrorSimplified", () => {
  it("should return an array of objects with the field name and message for each schema error", () => {
    const error = {
      details: [
        { path: ["name"], message: "The name field is required" },
        { path: ["age"], message: "The age field must be a number" },
      ],
      message: "Validation Error",
    };

    const expectedOutput = [
      { field: "name", message: "The name field is required" },
      { field: "age", message: "The age field must be a number" },
    ];

    expect(errors.schemaErrorSimplified(error)).toEqual(expectedOutput);
  });
});
