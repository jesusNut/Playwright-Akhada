import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";

/**===============================================================
 *!    ☠️☠️  GET METHOD + QUERY PARAMETERS ☠️☠️
 
//* 🤪 In API testing, we use a fixture called 'request' which is of type - 'APIRequestContext'

//? API USED :: https://restful-booker.herokuapp.com/apidoc/index.html#api-Booking-CreateBooking  
 *================================================================**/

test("1. Create a booking and then Get that booking ", async ({ request }) => {
  const firstname = faker.person.firstName();
  const lastname = faker.person.lastName();
  const totalprice = Number(
    faker.finance.amount({ min: 100, max: 1000, dec: 0 })
  );
  const depositPaid = Math.random() < 0.5;
  const checkindate = DateTime.now().toISODate();
  const checkoutdate = DateTime.now().plus({ days: 15 }).toISODate();
  const additionalneeds = faker.lorem.word(5);

  //!👉 CREATE A POST REQUEST
  const postApiResponse = await request.post(
    "https://restful-booker.herokuapp.com/booking",
    {
      data: {
        firstname: firstname,
        lastname: lastname,
        totalprice: totalprice,
        depositpaid: depositPaid,
        bookingdates: {
          checkin: checkindate,
          checkout: checkoutdate,
        },
        additionalneeds: additionalneeds,
      },
    }
  );

  //!👉 FETCH the booking id

  console.log(await postApiResponse.json());
  const bookingid = (await postApiResponse.json()).bookingid;
  console.log(bookingid);

  //!👉 MAKE the GET request

  const getApiResponse = await request.get(
    `https://restful-booker.herokuapp.com/booking/${bookingid}`
  );
  console.log(await getApiResponse.json());
  console.log(`Status code for GET request is ${getApiResponse.status()}`);
  expect(getApiResponse.status()).toBe(200);
});

test("2. Using Query Parameters : Get booking Ids for a first name", async ({
  request,
}) => {
  //Pre-requisite : Post a booking and create a booking id. Then only use the first name and last name as query param to get the booking id.
  const getApiResponse = await request.get(
    "https://restful-booker.herokuapp.com/booking",
    {
      params: { firstname: "Alycia", lastname: "Jast" },
    }
  );

  console.log(await getApiResponse.json());
  console.log(
    `URL that was sent to server with query param is : ${getApiResponse.url()}`
  );
});

