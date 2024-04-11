import { POST } from "@/app/api/login/route";
import { NextRequest } from "next/server";
import { validateUser } from "@/app/api/_services/user";

jest.mock("@/app/api/_services/user", () => ({
  validateUser: jest.fn().mockResolvedValue(true)
}));


jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  sign: jest.fn(() => "mockedToken"),
}));
beforeEach(() => {
  jest.clearAllMocks(); 
  (validateUser as jest.Mock).mockResolvedValue(true); 
});

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

const loginHandler = async (req: NextRequest) => {
  return await POST(req);
};

// Test cases
describe("/api/login", () => {
  test("login/emptyReq", async () => {
    const response = await loginHandler(createMockRequest({}));
    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({ message: "Email can not be undefined" });
  });

  test("login/emptyEmail", async () => {
    const response = await loginHandler(createMockRequest({ password: "testpassword" }));
    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({ message: "Email can not be undefined" });
  });

  test("login/emptyPassword", async () => {
    const response = await loginHandler(createMockRequest({ email: "test@qq.com" }));
    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({ message: "Password can not be undefined" });
  });
  test("login/successLogin", async () => {
    const response = await loginHandler(createMockRequest({ email: "test1@qq.com", password: "test" }));
    expect(response.status).toBe(200);
    const responseData = await response.json();
    expect(responseData.token).toBe("mockedToken");
  });
  test("login/failureLogin", async () => {
    // Override the mock for validateUser to return false for this test
    (validateUser as jest.Mock).mockResolvedValue(false);
    const response = await loginHandler(createMockRequest({ email: "user@example.com", password: "wrongpassword" }));
    expect(response.status).toBe(401);
    const responseData = await response.json();
    expect(responseData).toEqual({ message: "Email or password is incorrect" });
  });
  test("login/failedToParseJSON", async () => {
    const response = await loginHandler(createMockRequest(new Error("Error 1")));
    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({ message: "Payload body is undefined" }); 
  });
});



