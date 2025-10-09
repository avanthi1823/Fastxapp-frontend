import api from "../../api/axios";
import * as userService from "../userService";

// Mock axios
jest.mock("../../api/axios");

describe("userService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ------------------ Bookings ------------------
  test("getUserBookings should fetch user's bookings", async () => {
    const mockBookings = [{ bookingId: 1 }];
    api.get.mockResolvedValueOnce({ data: mockBookings });

    const result = await userService.getUserBookings();
    expect(api.get).toHaveBeenCalledWith("/user/bookings");
    expect(result).toEqual(mockBookings);
  });

  test("cancelBooking should delete a booking", async () => {
    const mockResponse = { success: true };
    api.delete.mockResolvedValueOnce({ data: mockResponse });

    const result = await userService.cancelBooking(1);
    expect(api.delete).toHaveBeenCalledWith("/Booking/1");
    expect(result).toEqual(mockResponse);
  });

  test("getBookingDetails should fetch booking details", async () => {
    const mockData = { bookingId: 1, seats: ["A1"] };
    api.get.mockResolvedValueOnce({ data: mockData });

    const result = await userService.getBookingDetails(1);
    expect(api.get).toHaveBeenCalledWith("/user/bookings/1");
    expect(result).toEqual(mockData);
  });

  // ------------------ Profile ------------------
  test("getProfile should fetch user profile", async () => {
    const mockProfile = { fullName: "John", phone: "1234567890" };
    api.get.mockResolvedValueOnce({ data: mockProfile });

    const result = await userService.getProfile();
    expect(api.get).toHaveBeenCalledWith("/user/profile");
    expect(result).toEqual(mockProfile);
  });

  test("updateProfile should update user profile", async () => {
    const profile = { fullName: "Jane", gender: "F", phone: "9876543210" };
    const mockResponse = { ...profile };
    api.put.mockResolvedValueOnce({ data: mockResponse });

    const result = await userService.updateProfile(profile);
    expect(api.put).toHaveBeenCalledWith("/user/profile", {
      FullName: "Jane",
      Gender: "F",
      Phone: "9876543210",
    });
    expect(result).toEqual(mockResponse);
  });

  // ------------------ Payments ------------------
  test("getPayments should fetch payment history", async () => {
    const mockPayments = [{ id: 1, amount: 500 }];
    api.get.mockResolvedValueOnce({ data: mockPayments });

    const result = await userService.getPayments();
    expect(api.get).toHaveBeenCalledWith("/user/payments");
    expect(result).toEqual(mockPayments);
  });
});
