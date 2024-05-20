import { test, expect } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  PUT METHOD + HEADERS  ☠️☠️
 
//* 🤪 In API testing, we use a fixture called 'request' which is of type - 'APIRequestContext'

//? API USED :: https://restful-booker.herokuapp.com/apidoc/index.html#api-Booking-CreateBooking   
 *================================================================**/

test("1. Update a booking and usage of Headers", async ({ request }) => {
  //!👉 GENERATE A TOKEN (REQUIRED TO BE SENT AS HEADER FOR PUT REQUEST AS PER DOCS)
  const tokenResponse = await request.post("https://restful-booker.herokuapp.com/auth", {
        data: {
            username: "admin",
            password: "password123",
        },
    });

    //!👉 FETCH THE TOKEN
    const token = (await tokenResponse.json()).token;
    console.log(`Token is ${token}`);

  //!👉 CREATE A POST REQUEST
  const postApiResponse = await request.post(
    "https://restful-booker.herokuapp.com/booking",
    {
      data: {
        firstname: "Abhishek",
        lastname: "Madan",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: "2024-04-07",
          checkout: "2024-05-15",
        },
        additionalneeds: "Dinner",
      },
    }
  );

  //!👉 FETCH THE BOOKING ID
  const bookingid = (await postApiResponse.json()).bookingid;
  console.log(`Booking id is : ${bookingid}`);

  //!👉 UPDATE THE BOOKING WITH HEADERS
  const putApiResponse = await request.put(
    `https://restful-booker.herokuapp.com/booking/${bookingid}`,
    {
      data: {
        firstname: "Abhishek",
        lastname: "Singhania",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: "2024-04-07",
          checkout: "2024-05-15",
        },
        additionalneeds: "Brunch",
      },
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Cookie" : `token=${token}`
      },
    }
  );

  const putApiResBody = await putApiResponse.json();
  expect(putApiResBody.lastname).toBe("Singhania");
  expect(putApiResBody.additionalneeds).toBe("Brunch");
  console.log(`Status code for GET request is ${putApiResponse.status()}`);
  expect(putApiResponse.status()).toBe(200);
});
