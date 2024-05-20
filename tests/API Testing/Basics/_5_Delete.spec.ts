import { test, expect } from "@playwright/test";

/**===============================================================
 *!    ☠️☠️  DELETE METHOD + HEADERS  ☠️☠️
 
//* 🤪 In API testing, we use a fixture called 'request' which is of type - 'APIRequestContext'

//? API USED :: https://restful-booker.herokuapp.com/apidoc/index.html#api-Booking-CreateBooking   
 *================================================================**/

test("1. Delete a booking", async ({ request }) => {
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

  //!👉 GET BOOKING BEFORE DELETION

  const getApiResponse = await request.get(
    `https://restful-booker.herokuapp.com/booking/${bookingId}`
  );
  console.log(`=================Booking details before deletion==================`);
  console.log(await getApiResponse.json());

  //!👉 DELETE THE BOOKING

  const deleteResponse = await request.delete(
    `https://restful-booker.herokuapp.com/booking/${bookingId}`,
    {
      headers: {
        Cookie: `token=${token}`,
        "Content-Type": `application/json`,
      },
    }
  );

  expect(deleteResponse.status()).toBe(201);
  expect(deleteResponse.statusText()).toBe("Created");

  //!👉 GET BOOKING AFTER DELETION

  const getApiResponseAfterDel = await request.get(
    `https://restful-booker.herokuapp.com/booking/${bookingId}`
  ); 
  console.log(`=================Status and status code after deletion==================`);
  expect(getApiResponseAfterDel.status()).toBe(404);
  expect (getApiResponseAfterDel.statusText()).toBe('Not Found');

});
