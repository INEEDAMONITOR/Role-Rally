// test/role.test.ts

jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"), // Preserve other jwt functions unmocked
  verify: jest.fn((token: string, secret: string) => {
    console.log("fake jwt verify token:", token);
    // Default mock behavior for jwt.verify
    if (token === "validToken") {
      // Simulate successful token verification with a mock payload
      const decodedPayload = { userId: "123", email: "user@example.com" }; // Example payload
      return decodedPayload;
    } else {
      // Simulate token verification failure
      const error = new Error("invalid token");
      throw error;
    }
  }),
}));
jest.mock("@/app/api/_services/role", () => ({
  getRolesWithProfile: jest.fn().mockResolvedValue([
    { roleId: "role1", roleName: "Admin" },
    { roleId: "role2", roleName: "User" },
  ]),
}));
import { getRolesWithProfile } from "@/app/api/_services/role";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getUser } from "@/app/api/_services/user";
import { GET } from "@/app/api/role/route";
// Set a consistent JWT secret for testing
process.env.JWT_SECRET = "test_secret";

// Function to create a mock NextRequest with predefined cookie values
function createMockRequest(cookieValue: string | Error) {
  return {
    cookies: {
      get: (name: string) => {
        if (name === "roleRallyUserToken") {
          return { value: cookieValue };
        }
        return null;
      },
    },
  } as unknown as NextRequest;
}

describe("JWT verification", () => {
  it("successfully verifies a valid token", () => {
    const token = "validToken";
    const secret = process.env.JWT_SECRET;

    expect(jwt.verify(token, secret as string)).toEqual({
      userId: "123",
      email: "user@example.com",
    });

    jwt.verify(token, secret as string, (err, decoded) => {
      expect(err).toBeNull();
      expect(decoded).toEqual({ userId: "123", email: "user@example.com" });
    });
  });

  it("throws an error for an invalid token", () => {
    const token = "invalidToken";
    const secret = process.env.JWT_SECRET;
    expect(() => jwt.verify(token, secret as string)).toThrow("invalid token");
  });
  test("handles valid token and retrieves roles", async () => {
    const mockRequest = createMockRequest("validToken");
    const response = await GET(mockRequest, {});
    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual([
      { roleId: "role1", roleName: "Admin" },
      { roleId: "role2", roleName: "User" },
    ]);
  });
  test("handles invalid token", async () => {
    const mockRequest = createMockRequest("");
    const response = await GET(mockRequest, {});
    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({ message: "No token provided" });
  });
  test("handles invalid request", async () => {
    const mockRequest = createMockRequest(new Error("req error"));
    const response = await GET(mockRequest, {});
    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ message: "Internal error" });
  });
});
