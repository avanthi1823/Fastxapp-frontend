import api from "../../api/axios";
import operatorService from "../operatorService";

// Mock axios
jest.mock("../../api/axios");

describe("operatorService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ------------------ Buses ------------------
  test("getMyBuses should fetch operator's buses", async () => {
    const mockBuses = [{ busId: 1, name: "Express" }];
    api.get.mockResolvedValueOnce({ data: mockBuses });

    const result = await operatorService.getMyBuses();
    expect(api.get).toHaveBeenCalledWith("/operator/my-buses");
    expect(result).toEqual(mockBuses);
  });

  test("addBus should post bus data", async () => {
    const busData = { name: "Express", totalSeats: 40 };
    const mockResponse = { busId: 1, ...busData };
    api.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await operatorService.addBus(busData);
    expect(api.post).toHaveBeenCalledWith("/operator/add-bus", busData);
    expect(result).toEqual(mockResponse);
  });

  test("updateBus should put bus data", async () => {
    const busData = { name: "Express Updated" };
    const mockResponse = { busId: 1, ...busData };
    api.put.mockResolvedValueOnce({ data: mockResponse });

    const result = await operatorService.updateBus(1, busData);
    expect(api.put).toHaveBeenCalledWith("/operator/update-bus/1", busData);
    expect(result).toEqual(mockResponse);
  });

  test("deleteBus should delete a bus", async () => {
    const mockResponse = { success: true };
    api.delete.mockResolvedValueOnce({ data: mockResponse });

    const result = await operatorService.deleteBus(1);
    expect(api.delete).toHaveBeenCalledWith("/operator/delete-bus/1");
    expect(result).toEqual(mockResponse);
  });

  // ------------------ Bookings ------------------
  test("getBookings should fetch operator's bookings", async () => {
    const mockBookings = [{ bookingId: 1 }];
    api.get.mockResolvedValueOnce({ data: mockBookings });

    const result = await operatorService.getBookings();
    expect(api.get).toHaveBeenCalledWith("/operator/bookings");
    expect(result).toEqual(mockBookings);
  });

  // ------------------ Amenities ------------------
  test("getAmenities should fetch amenities", async () => {
    const mockAmenities = ["AC", "WiFi"];
    api.get.mockResolvedValueOnce({ data: mockAmenities });

    const result = await operatorService.getAmenities();
    expect(api.get).toHaveBeenCalledWith("/operator/amenities");
    expect(result).toEqual(mockAmenities);
  });

  test("assignAmenities should post amenities assignment", async () => {
    const mockResponse = { success: true };
    api.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await operatorService.assignAmenities(1, [1, 2]);
    expect(api.post).toHaveBeenCalledWith("/operator/assign-amenities", { busId: 1, amenitiesIds: [1, 2] });
    expect(result).toEqual(mockResponse);
  });

  // ------------------ Schedules ------------------
  test("getMySchedules should fetch operator schedules", async () => {
    const mockSchedules = [{ scheduleId: 1 }];
    api.get.mockResolvedValueOnce({ data: mockSchedules });

    const result = await operatorService.getMySchedules();
    expect(api.get).toHaveBeenCalledWith("/schedule/my-schedules");
    expect(result).toEqual(mockSchedules);
  });

  test("addSchedule should post schedule data with parsed values", async () => {
    const scheduleData = {
      busId: "1",
      routeId: "2",
      departureTime: "2025-09-02T10:00:00",
      arrivalTime: "2025-09-02T12:00:00",
      fare: "500",
    };
    const mockResponse = { scheduleId: 1, ...scheduleData };
    api.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await operatorService.addSchedule(scheduleData);
    expect(api.post).toHaveBeenCalledWith("/schedule", {
      BusId: 1,
      RouteId: 2,
      DepartureTime: new Date(scheduleData.departureTime).toISOString(),
      ArrivalTime: new Date(scheduleData.arrivalTime).toISOString(),
      Fare: 500,
    });
    expect(result).toEqual(mockResponse);
  });

  test("updateSchedule should put schedule data", async () => {
    const payload = { fare: 600 };
    const mockResponse = { scheduleId: 1, ...payload };
    api.put.mockResolvedValueOnce({ data: mockResponse });

    const result = await operatorService.updateSchedule(1, payload);
    expect(api.put).toHaveBeenCalledWith("/schedule/1", payload);
    expect(result).toEqual(mockResponse);
  });

  test("deleteSchedule should delete schedule by id", async () => {
    const mockResponse = { success: true };
    api.delete.mockResolvedValueOnce({ data: mockResponse });

    const result = await operatorService.deleteSchedule(1);
    expect(api.delete).toHaveBeenCalledWith("/schedule/1");
    expect(result).toEqual(mockResponse);
  });

  // ------------------ Routes ------------------
  test("getRoutes should fetch all routes", async () => {
    const mockRoutes = [{ routeId: 1 }];
    api.get.mockResolvedValueOnce({ data: mockRoutes });

    const result = await operatorService.getRoutes();
    expect(api.get).toHaveBeenCalledWith("/route");
    expect(result).toEqual(mockRoutes);
  });

  test("addRoute should post new route with parsed distance", async () => {
    const routeData = { Origin: "A", Destination: "B", Distance: "100" };
    const mockResponse = { routeId: 1, ...routeData };
    api.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await operatorService.addRoute(routeData);
    expect(api.post).toHaveBeenCalledWith("/route", { ...routeData, Distance: 100 });
    expect(result).toEqual(mockResponse);
  });

  test("updateRoute should put route data with parsed distance", async () => {
    const routeData = { Origin: "X", Destination: "Y", Distance: "150" };
    const mockResponse = { routeId: 1, ...routeData };
    api.put.mockResolvedValueOnce({ data: mockResponse });

    const result = await operatorService.updateRoute(1, routeData);
    expect(api.put).toHaveBeenCalledWith("/route/1", { ...routeData, Distance: 150 });
    expect(result).toEqual(mockResponse);
  });

  test("deleteRoute should delete route by id", async () => {
    const mockResponse = { success: true };
    api.delete.mockResolvedValueOnce({ data: mockResponse });

    const result = await operatorService.deleteRoute(1);
    expect(api.delete).toHaveBeenCalledWith("/route/1");
    expect(result).toEqual(mockResponse);
  });
});
