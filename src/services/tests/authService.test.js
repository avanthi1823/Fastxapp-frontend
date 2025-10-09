import authService from "../authService";
import api from "../../api/authInterceptor";

jest.mock("../../api/authInterceptor");

describe("authService", () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("login should call api.post with email and password", async () => {
    const mockResponse = { data: { token: "abc123", roleId: 2 } };
    api.post.mockResolvedValueOnce(mockResponse);

    const result = await authService.login("test@example.com", "password123");

    expect(api.post).toHaveBeenCalledWith("/auth/login", {
      email: "test@example.com",
      password: "password123",
    });
    expect(result).toEqual({ token: "abc123", roleId: 2 });
  });

  test("register should call api.post with user data", async () => {
    const userData = { email: "new@example.com", password: "pass123" };
    const mockResponse = { data: { id: 1, ...userData } };
    api.post.mockResolvedValueOnce(mockResponse);

    const result = await authService.register(userData);

    expect(api.post).toHaveBeenCalledWith("/auth/register", userData);
    expect(result).toEqual({ id: 1, email: "new@example.com", password: "pass123" });
  });

  test("logout should clear localStorage and call redirectToLogin", () => {
  localStorage.setItem("token", "abc123");
  localStorage.setItem("roleId", "2");

  // spy on authService.redirectToLogin
  const redirectSpy = jest.spyOn(authService, "redirectToLogin").mockImplementation(() => {});

  authService.logout();

  expect(localStorage.getItem("token")).toBeNull();
  expect(localStorage.getItem("roleId")).toBeNull();
  expect(redirectSpy).toHaveBeenCalled();

  redirectSpy.mockRestore();
});

});
