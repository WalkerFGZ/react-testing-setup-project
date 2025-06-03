import { HttpResponse, http } from "msw";

export const handlers = [
  http.get("http://localhost:3001/orders", () => {
    return HttpResponse.json([
      {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        customer: {
          id: "99bd3a64-13f7-4b37-9706-e71f8d0d9cf4",
          name: "Jane Smith",
          email: "jane.smith@example.com",
        },
        products: [
          {
            id: "404daf2a-9b97-41f3-b04d-e3e5a7dc8cb4",
            name: "Smartphone",
            price: 699.99,
            quantity: 1,
          },
          {
            id: "6d62d909-f957-430e-8689-b5129c0bb75e",
            name: "Phone Case",
            price: 19.99,
            quantity: 1,
          },
          {
            id: "3c7eb6bc-a146-4523-a442-f6c676f5a5f7",
            name: "Screen Protector",
            price: 9.99,
            quantity: 2,
          },
        ],
        total: 739.96,
        status: "processing",
        orderDate: "2023-10-05T14:30:00Z",
        shippingAddress: {
          street: "456 Elm St",
          city: "Other City",
          state: "NY",
          zipCode: "67890",
          country: "USA",
        },
        paymentMethod: "paypal",
      },
    ]);
  }),
];
