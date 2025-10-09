import api from "../../api/authInterceptor";
import * as bookingService from "../bookingService";

// Mock axios instance
jest.mock("../../api/authInterceptor");

describe("bookingService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getSeats should fetch seats for schedule", async () => {
    const mockSeats = [{ seatNo: "A1", available: true }];
    api.get.mockResolvedValueOnce({ data: mockSeats });

    const result = await bookingService.getSeats(1);

    expect(api.get).toHaveBeenCalledWith("/seat/schedule/1");
    expect(result).toEqual(mockSeats);
  });

  test("bookSeats should post booking data", async () => {
    const bookingData = { scheduleId: 1, seats: ["A1"] };
    const mockResponse = { success: true };
    api.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await bookingService.bookSeats(bookingData);

    expect(api.post).toHaveBeenCalledWith("/booking", bookingData);
    expect(result).toEqual(mockResponse);
  });

  test("createBooking should post booking data", async () => {
    const bookingData = { scheduleId: 2, seats: ["B1"] };
    const mockResponse = { success: true };
    api.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await bookingService.createBooking(bookingData);

    expect(api.post).toHaveBeenCalledWith("/booking", bookingData);
    expect(result).toEqual(mockResponse);
  });

  test("getUserBookings should fetch current user's bookings", async () => {
    const mockBookings = [{ id: 1, seats: ["A1"] }];
    api.get.mockResolvedValueOnce({ data: mockBookings });

    const result = await bookingService.getUserBookings();

    expect(api.get).toHaveBeenCalledWith("/user/bookings");
    expect(result).toEqual(mockBookings);
  });

  test("cancelBooking should delete a booking by id", async () => {
    const mockResponse = { success: true };
    api.delete.mockResolvedValueOnce({ data: mockResponse });

    const result = await bookingService.cancelBooking(1);

    expect(api.delete).toHaveBeenCalledWith("/booking/1");
    expect(result).toEqual(mockResponse);
  });
});
