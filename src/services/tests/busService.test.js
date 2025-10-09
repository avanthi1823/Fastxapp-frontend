import api from "../../api/axios";
import * as busService from "../busService";

// Mock the axios instance
jest.mock("../../api/axios");

describe("busService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("searchBuses should post search data and return results", async () => {
    const mockData = [{ busId: 1, name: "Express" }];
    api.post.mockResolvedValueOnce({ data: mockData });

    const result = await busService.searchBuses("A", "B", "2025-09-02");

    expect(api.post).toHaveBeenCalledWith("/search", {
      origin: "A",
      destination: "B",
      travelDate: new Date("2025-09-02").toISOString(),
    });
    expect(result).toEqual(mockData);
  });

  test("getBusDetails should fetch bus details", async () => {
    const mockData = { busId: 1, name: "Express" };
    api.get.mockResolvedValueOnce({ data: mockData });

    const result = await busService.getBusDetails(1);

    expect(api.get).toHaveBeenCalledWith("/buses/1");
    expect(result).toEqual(mockData);
  });

  test("bookSeats should post booking data", async () => {
    const bookingData = { scheduleId: 1, seats: ["A1"] };
    const mockData = { success: true };
    api.post.mockResolvedValueOnce({ data: mockData });

    const result = await busService.bookSeats(bookingData);

    expect(api.post).toHaveBeenCalledWith("/booking", bookingData);
    expect(result).toEqual(mockData);
  });

  test("getSeats should fetch seats for a schedule", async () => {
    const mockData = [{ seatNo: "A1", available: true }];
    api.get.mockResolvedValueOnce({ data: mockData });

    const result = await busService.getSeats(1);

    expect(api.get).toHaveBeenCalledWith("/seat/schedule/1");
    expect(result).toEqual(mockData);
  });

  test("getBusSchedules should fetch bus schedules", async () => {
    const mockData = [{ scheduleId: 1, time: "10:00" }];
    api.get.mockResolvedValueOnce({ data: mockData });

    const result = await busService.getBusSchedules(1);

    expect(api.get).toHaveBeenCalledWith("/buses/1/schedules");
    expect(result).toEqual(mockData);
  });

  test("getBusAmenities should fetch bus amenities", async () => {
    const mockData = ["AC", "WiFi"];
    api.get.mockResolvedValueOnce({ data: mockData });

    const result = await busService.getBusAmenities(1);

    expect(api.get).toHaveBeenCalledWith("/buses/1/amenities");
    expect(result).toEqual(mockData);
  });
});
