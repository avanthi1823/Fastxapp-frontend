import api from "../../api/axios";
import * as paymentService from "../paymentService";

// Mock axios
jest.mock("../../api/axios");

describe("paymentService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("makePayment should post booking payment", async () => {
    const mockResponse = { success: true };
    api.post.mockResolvedValueOnce({ data: mockResponse });

    const payload = { bookingId: 1, amount: 500 };
    const result = await paymentService.makePayment(payload);

    expect(api.post).toHaveBeenCalledWith("/payment/record", payload);
    expect(result).toEqual(mockResponse);
  });

  test("getPaymentDetails should fetch payment details", async () => {
    const mockData = { bookingId: 1, amount: 500 };
    api.get.mockResolvedValueOnce({ data: mockData });

    const result = await paymentService.getPaymentDetails(1);

    expect(api.get).toHaveBeenCalledWith("/payment/1");
    expect(result).toEqual(mockData);
  });

  test("searchPayments should post search request", async () => {
    const mockData = [{ bookingId: 1, amount: 500 }];
    const searchRequest = { dateFrom: "2025-09-01", dateTo: "2025-09-02" };

    api.post.mockResolvedValueOnce({ data: mockData });

    const result = await paymentService.searchPayments(searchRequest);

    expect(api.post).toHaveBeenCalledWith("/payment/search", searchRequest);
    expect(result).toEqual(mockData);
  });
});
