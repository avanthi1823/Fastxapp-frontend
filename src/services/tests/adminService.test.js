// src/services/tests/adminService.test.js
import api from "../../api/axios";
import adminService from "../adminService";

// Mock the axios instance
jest.mock("../../api/axios");

describe("adminService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ------------------ Users ------------------
  test("getUsers should fetch users", async () => {
    const mockUsers = [{ id: 1, name: "Alice" }];
    api.get.mockResolvedValueOnce({ data: mockUsers });

    const result = await adminService.getUsers();
    expect(api.get).toHaveBeenCalledWith("/admin/users");
    expect(result).toEqual(mockUsers);
  });

  test("deleteUser should delete a user by id", async () => {
    const mockResponse = { success: true };
    api.delete.mockResolvedValueOnce({ data: mockResponse });

    const result = await adminService.deleteUser(1);
    expect(api.delete).toHaveBeenCalledWith("/admin/user/1");
    expect(result).toEqual(mockResponse);
  });

  // ------------------ Operators ------------------
  test("getOperators should fetch operators", async () => {
    const mockOperators = [{ id: 1, name: "KPN" }];
    api.get.mockResolvedValueOnce({ data: mockOperators });

    const result = await adminService.getOperators();
    expect(api.get).toHaveBeenCalledWith("/admin/operators");
    expect(result).toEqual(mockOperators);
  });

  test("deleteOperator should delete operator by id", async () => {
    const mockResponse = { success: true };
    api.delete.mockResolvedValueOnce({ data: mockResponse });

    const result = await adminService.deleteOperator(1);
    expect(api.delete).toHaveBeenCalledWith("/admin/operator/1");
    expect(result).toEqual(mockResponse);
  });

  // ------------------ Bookings ------------------
  test("getBookings should fetch bookings", async () => {
    const mockBookings = [{ id: 1, user: "Alice" }];
    api.get.mockResolvedValueOnce({ data: mockBookings });

    const result = await adminService.getBookings();
    expect(api.get).toHaveBeenCalledWith("/admin/bookings");
    expect(result).toEqual(mockBookings);
  });

  test("deleteBooking should delete booking by id", async () => {
    const mockResponse = { success: true };
    api.delete.mockResolvedValueOnce({ data: mockResponse });

    const result = await adminService.deleteBooking(1);
    expect(api.delete).toHaveBeenCalledWith("/admin/booking/1");
    expect(result).toEqual(mockResponse);
  });

  // ------------------ Routes ------------------
  test("getRoutes should normalize route data", async () => {
    const mockRoutes = [
      { routeId: 1, origin: "A", destination: "B" },
      { RouteId: 2, Origin: "X", Destination: "Y" },
    ];
    api.get.mockResolvedValueOnce({ data: mockRoutes });

    const result = await adminService.getRoutes();
    expect(api.get).toHaveBeenCalledWith("/route");
    expect(result).toEqual([
      { routeId: 1, origin: "A", destination: "B" },
      { routeId: 2, origin: "X", destination: "Y" },
    ]);
  });

  test("addRoute should post new route", async () => {
    const newRoute = { origin: "A", destination: "B" };
    const mockResponse = { id: 1, ...newRoute };
    api.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await adminService.addRoute(newRoute);
    expect(api.post).toHaveBeenCalledWith("/route", newRoute);
    expect(result).toEqual(mockResponse);
  });

  test("updateRoute should put route data with routeId", async () => {
    const updatedRoute = { origin: "C", destination: "D" };
    const mockResponse = { id: 1, ...updatedRoute };
    api.put.mockResolvedValueOnce({ data: mockResponse });

    const result = await adminService.updateRoute(1, updatedRoute);
    expect(api.put).toHaveBeenCalledWith("/route/1", { routeId: 1, ...updatedRoute });
    expect(result).toEqual(mockResponse);
  });

  test("deleteRoute should delete route by id", async () => {
    const mockResponse = { success: true };
    api.delete.mockResolvedValueOnce({ data: mockResponse });

    const result = await adminService.deleteRoute(1);
    expect(api.delete).toHaveBeenCalledWith("/route/1");
    expect(result).toEqual(mockResponse);
  });
});
