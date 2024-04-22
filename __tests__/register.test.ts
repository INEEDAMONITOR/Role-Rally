import { POST } from "@/app/api/register/route";
import { dbConnect, validateEmail } from "@/app/api/_utils";
import { createUser } from "@/app/api/_services/user";
import { NextRequest } from "next/server";

jest.mock("@/app/api/_utils", () => ({
  dbConnect: jest.fn().mockResolvedValue(true),
  validateEmail: jest.fn(),
}));
jest.mock("@/app/api/_services/user", () => ({
  createUser: jest.fn(),
}));
jest.mock("bcrypt", () => ({
  hashSync: jest.fn().mockReturnValue("hashedPassword"),
}));

function setdbConnect(b: Boolean | Error) {
  if (b instanceof Error) {
    (dbConnect as jest.Mock).mockRejectedValue(
      new Error("Database connection timeout")
    );
  } else {
    (dbConnect as jest.Mock).mockResolvedValue(b);
  }
}

function setValidateEmail(b: Boolean) {
  (validateEmail as jest.Mock).mockReturnValue(b);
}

function setCreateUser(value: object | null | Error) {
  if (value instanceof Error) {
    (createUser as jest.Mock).mockRejectedValue(value);
  } else {
    (createUser as jest.Mock).mockResolvedValue(value);
  }
}
function createMockRequest(body: object | Error) {
  if (body instanceof Error) {
    return {
      json: jest.fn().mockRejectedValue(body),
    } as unknown as NextRequest;
  } else {
    return {
      json: jest.fn().mockResolvedValue(body),
    } as unknown as NextRequest;
  }
}
describe("POST /api/user", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns 400 for invalid name", async () => {
    const request = createMockRequest({
      name: "",
      email: "test@example.com",
      password: "password",
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ message: "Invalid name" });
  });

  test("returns 400 for invalid email", async () => {
    setValidateEmail(false);
    const request = createMockRequest({
      name: "Test User",
      email: "invalid",
      password: "password",
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      message: "Invalid email",
      error: "Invalid email",
    });
  });

  test("creates user successfully", async () => {
    setValidateEmail(true);
    setCreateUser({ id: 1, name: "Test User", email: "test@example.com" });
    const request = createMockRequest({
      name: "Test User",
      email: "test@example.com",
      password: "password",
    });
    const response = await POST(request);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      message: "User created successfully",
      data: { id: 1, name: "Test User", email: "test@example.com" },
    });
  });

  test("returns 400 if user creation fails", async () => {
    setValidateEmail(true);
    setCreateUser(null);
    const request = createMockRequest({
      name: "Test User",
      email: "existing@example.com",
      password: "password",
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      message: "User registration failed. The Email may be existed",
    });
  });

  test("handles database connection errors", async () => {
    setValidateEmail(true);
    setdbConnect(new Error("Database connection timeout"));
    const request = createMockRequest({
      name: "Test User",
      email: "test@example.com",
      password: "password",
    });
    const response = await POST(request);
    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      message: "Database connection timeout",
    });
  });
});
