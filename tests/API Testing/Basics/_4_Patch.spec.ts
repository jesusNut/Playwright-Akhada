import { test, expect } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  PATCH METHOD + HEADERS  ☠️☠️
 
//* 🤪 In API testing, we use a fixture called 'request' which is of type - 'APIRequestContext'

//? API USED :: https://restful-booker.herokuapp.com/apidoc/index.html#api-Booking-CreateBooking   
 *================================================================**/

test("1. Update a booking using PATCH and usage & Assertion of headers", async ({
  request,
}) => {
  //!👉 GENERATE A TOKEN (REQUIRED TO BE SENT AS HEADER FOR PUT REQUEST AS PER DOCS)
  const tokenResponse = await request.post(
    "https://restful-booker.herokuapp.com/auth",
    {
      data: {
        username: "admin",
        password: "password123",
      },
    }
  );

  //!👉 FETCH THE TOKEN
  const token = (await tokenResponse.json()).token;
  console.log(`Token is ${token}`);

  //!👉 CREATE A BOOKING
  const postResponse = await request.post(
    "https://restful-booker.herokuapp.com/booking",
    {
      data: {
        firstname: "Jim",
        lastname: "Brown",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: "2018-01-01",
          checkout: "2019-01-01",
        },
        additionalneeds: "Pillow",
      },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  //!👉 EXTRACT THE BOOKING ID
  const bookingId = (await postResponse.json()).bookingid;
  console.log(bookingId);

  //!👉 MODIFY THE BOOKING USING PATCH COMMAND

  const patchResponse = await request.patch(
    `https://restful-booker.herokuapp.com/booking/${bookingId}`,
    {
      data: {
        depositpaid: false,
        bookingdates: {
          checkin: "2024-01-01",
          checkout: "2024-04-14",
        },
        additionalneeds: "Teddy bear",
      },
      headers: {
        Cookie: `token=${token}`,
        "Content-Type": `application/json`,
      },
    }
  );

  console.log(await patchResponse.json());
  expect(patchResponse.status()).toBe(200);

  //! Printing and Asserting HEADERS
  //console.log(typeof patchResponse.headers());
  //console.log(patchResponse.headersArray());
  expect(patchResponse.headers()).toHaveProperty("content-length", "170");

  expect(JSON.parse(patchResponse.headers()["report-to"])).toHaveProperty(
    "group",
    "heroku-nel"
  );
});
