import { expect, test } from "@playwright/test";
import * as jsondata from "../../../jsonsReq_4_api/postBookingPayload.json";
import * as dynamicjsondata from "../../../jsonsReq_4_api/postBookingPayload_dynamic.json";
import { stringFormat} from "../../../utils/common";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";

/**===============================================================
 *!    ☠️☠️  POST METHOD + ASSERTIONS ☠️☠️
 
//* 🤪 In API testing, we use a fixture called 'request' which is of type - 'APIRequestContext'

//? API USED :: https://restful-booker.herokuapp.com/apidoc/index.html#api-Booking-CreateBooking   
//? HOW TO READ external JSON file in TS : https://reacthustle.com/blog/how-to-import-a-json-file-in-typescript
 *================================================================**/

test("1. Post a booking using static request body + assertions", async ({
  request,
}) => {
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

  //!👉 PRINT THE RESPONSE BODY as JSON Object(TS object) & not as JSON string
  const postApiResponseBodyInJson = await postApiResponse.json();
  console.log(typeof postApiResponseBodyInJson);
  console.log(postApiResponseBodyInJson);
  //!👉 PRINT THE RESPONSE CODE AND MESSAGE
  console.log(` ${postApiResponse.status()} ${postApiResponse.statusText()}`);
  //!👉 PRINT WHETHER THE RESPONSE CODE IS IN RANGE 200 TO 299 OR NOT.
  console.log(
    ` Status code is in the range of 200-299 - ${postApiResponse.ok()}`
  );

  //!👉 ASSERT RESPONSE CODE
  expect(postApiResponse.status()).toBe(200);
  expect(postApiResponse.ok()).toBeTruthy();

  //!👉 ASSERT RESPONSE BODY
  expect(postApiResponseBodyInJson).toHaveProperty("bookingid");
  expect(postApiResponseBodyInJson).toHaveProperty(
    "booking.firstname",
    "Abhishek"
  );
  expect(postApiResponseBodyInJson).toHaveProperty(
    "booking.bookingdates.checkin",
    "2024-04-07"
  );
  expect(postApiResponseBodyInJson).toHaveProperty("booking.bookingdates", {
    checkin: "2024-04-07",
    checkout: "2024-05-15",
  });
  expect(postApiResponseBodyInJson.booking.firstname).toBe("Abhishek");
  expect(postApiResponseBodyInJson.booking.lastname).toBe("Madan");
  expect(postApiResponseBodyInJson.booking.bookingdates.checkin).toBe(
    "2024-04-07"
  );
  expect(Object.keys(postApiResponseBodyInJson)).toContainEqual("bookingid");
  expect(Object.keys(postApiResponseBodyInJson)).toStrictEqual([
    "bookingid",
    "booking",
  ]);
  expect(Object.keys(postApiResponseBodyInJson.booking)).toStrictEqual([
    "firstname",
    "lastname",
    "totalprice",
    "depositpaid",
    "bookingdates",
    "additionalneeds",
  ]);
  expect(typeof postApiResponseBodyInJson.booking.firstname).toBe("string");
  //*--------------------------------------------------------------------------------------------
  //👻👻👻👻👻👻using object destructuring for assertion.👻👻👻👻👻👻👻👻
  const { booking, bookingid } = postApiResponseBodyInJson;
  expect(bookingid).toBeTruthy();
  expect(booking).toStrictEqual({
    firstname: "Abhishek",
    lastname: "Madan",
    totalprice: 111,
    depositpaid: true,
    bookingdates: { checkin: "2024-04-07", checkout: "2024-05-15" },
    additionalneeds: "Dinner",
  });

  //*--------------------------------------------------------------------------------------------
  //👻👻👻👻👻👻Amuthan way of asserting response👻👻👻👻👻👻👻👻
  expect(booking).toStrictEqual(
    expect.objectContaining({
      firstname: expect.any(String),
      lastname: expect.any(String),
      totalprice: expect.any(Number),
      depositpaid: expect.any(Boolean),
      bookingdates: {
        checkin: expect.any(String),
        checkout: expect.any(String),
      },
      additionalneeds: expect.any(String),
    })
  );
});

test("2. Post a booking using static JSON file + assertions", async ({
  request,
}) => {
  //!👉 CREATE A POST REQUEST
  const postApiResponse = await request.post(
    "https://restful-booker.herokuapp.com/booking",
    {
      data: jsondata,
    }
  );

  //!👉 PRINT THE RESPONSE BODY as JSON Object(TS object) & not as JSON string
  const postApiResponseBodyInJson = await postApiResponse.json();
  console.log(typeof postApiResponseBodyInJson);
  console.log(postApiResponseBodyInJson);
  //!👉 PRINT THE RESPONSE CODE AND MESSAGE
  console.log(` ${postApiResponse.status()} ${postApiResponse.statusText()}`);
  //!👉 PRINT WHETHER THE RESPONSE CODE IS IN RANGE 200 TO 299 OR NOT.
  console.log(
    ` Status code is in the range of 200-299 - ${postApiResponse.ok()}`
  );

  //!👉 ASSERT RESPONSE CODE
  expect(postApiResponse.status()).toBe(200);
  expect(postApiResponse.ok()).toBeTruthy();

  //!👉 ASSERT RESPONSE BODY
  expect(postApiResponseBodyInJson).toHaveProperty("bookingid");
  expect(postApiResponseBodyInJson).toHaveProperty(
    "booking.firstname",
    "Abhishek"
  );
  expect(postApiResponseBodyInJson).toHaveProperty(
    "booking.bookingdates.checkin",
    "2024-04-07"
  );
  expect(postApiResponseBodyInJson).toHaveProperty("booking.bookingdates", {
    checkin: "2024-04-07",
    checkout: "2024-05-15",
  });
  expect(postApiResponseBodyInJson.booking.firstname).toBe("Abhishek");
  expect(postApiResponseBodyInJson.booking.lastname).toBe("Madan");
  expect(postApiResponseBodyInJson.booking.bookingdates.checkin).toBe(
    "2024-04-07"
  );
  expect(Object.keys(postApiResponseBodyInJson)).toContainEqual("bookingid");
  expect(Object.keys(postApiResponseBodyInJson)).toStrictEqual([
    "bookingid",
    "booking",
  ]);
  expect(Object.keys(postApiResponseBodyInJson.booking)).toStrictEqual([
    "firstname",
    "lastname",
    "totalprice",
    "depositpaid",
    "bookingdates",
    "additionalneeds",
  ]);
  expect(typeof postApiResponseBodyInJson.booking.firstname).toBe("string");
  //*--------------------------------------------------------------------------------------------
  //👻👻👻👻👻👻using object destructuring for assertion.👻👻👻👻👻👻👻👻
  const { booking, bookingid } = postApiResponseBodyInJson;
  expect(bookingid).toBeTruthy();
  expect(booking).toStrictEqual({
    firstname: "Abhishek",
    lastname: "Madan",
    totalprice: 111,
    depositpaid: true,
    bookingdates: { checkin: "2024-04-07", checkout: "2024-05-15" },
    additionalneeds: "Dinner",
  });

  //*--------------------------------------------------------------------------------------------
  //👻👻👻👻👻👻Amuthan way of asserting response schema👻👻👻👻👻👻👻👻
  expect(booking).toStrictEqual(
    expect.objectContaining({
      firstname: expect.any(String),
      lastname: expect.any(String),
      totalprice: expect.any(Number),
      depositpaid: expect.any(Boolean),
      bookingdates: {
        checkin: expect.any(String),
        checkout: expect.any(String),
      },
      additionalneeds: expect.any(String),
    })
  );
});

test("3. Post a booking using DYNAMIC request body + assertions", async ({
  request,
}) => {
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

  //!👉 PRINT THE RESPONSE BODY as JSON Object(TS object) & not as JSON string
  const postApiResponseBodyInJson = await postApiResponse.json();
  console.log(typeof postApiResponseBodyInJson);
  console.log(postApiResponseBodyInJson);
  //!👉 PRINT THE RESPONSE CODE AND MESSAGE
  console.log(` ${postApiResponse.status()} ${postApiResponse.statusText()}`);
  //!👉 PRINT WHETHER THE RESPONSE CODE IS IN RANGE 200 TO 299 OR NOT.
  console.log(
    ` Status code is in the range of 200-299 - ${postApiResponse.ok()}`
  );

  //!👉 ASSERT RESPONSE CODE
  expect(postApiResponse.status()).toBe(200);
  expect(postApiResponse.ok()).toBeTruthy();

  //!👉 ASSERT RESPONSE BODY
  expect(postApiResponseBodyInJson).toHaveProperty("bookingid");
  expect(postApiResponseBodyInJson).toHaveProperty(
    "booking.firstname",
    firstname
  );
  expect(postApiResponseBodyInJson).toHaveProperty(
    "booking.bookingdates.checkin",
    checkindate
  );
  expect(postApiResponseBodyInJson).toHaveProperty("booking.bookingdates", {
    checkin: checkindate,
    checkout: checkoutdate,
  });
  expect(postApiResponseBodyInJson.booking.firstname).toBe(firstname);
  expect(postApiResponseBodyInJson.booking.lastname).toBe(lastname);
  expect(postApiResponseBodyInJson.booking.bookingdates.checkin).toBe(
    checkindate
  );
  expect(Object.keys(postApiResponseBodyInJson)).toContainEqual("bookingid");
  expect(Object.keys(postApiResponseBodyInJson)).toStrictEqual([
    "bookingid",
    "booking",
  ]);
  expect(Object.keys(postApiResponseBodyInJson.booking)).toStrictEqual([
    "firstname",
    "lastname",
    "totalprice",
    "depositpaid",
    "bookingdates",
    "additionalneeds",
  ]);
  expect(typeof postApiResponseBodyInJson.booking.firstname).toBe("string");
});

test("4. Post a booking using DYNAMIC JSON file + assertions", async ({
  request,
}) => {
  //make the json file 'jsonsReq_4_api\postBookingPayload_dynamic.json' dynamic using utility method @ utils\common.ts
  const firstname = faker.person.firstName();
  const lastname = faker.person.lastName();
  // const totalprice = Number(
  //   faker.finance.amount({ min: 100, max: 1000, dec: 0 })
  // );
  // const depositPaid = Math.random() < 0.5;
  // const checkindate = DateTime.now().toISODate();
  // const checkoutdate = DateTime.now().plus({ days: 15 }).toISODate();
  const additionalneeds = faker.lorem.word(5);

  const formatteddynamicjsondata = stringFormat(
    JSON.stringify(dynamicjsondata),
    firstname,
    lastname,
    additionalneeds
  );

  //!👉 CREATE A POST REQUEST
  const postApiResponse = await request.post(
    "https://restful-booker.herokuapp.com/booking",
    { data: JSON.parse(formatteddynamicjsondata) }
  );

  //!👉 PRINT THE RESPONSE BODY as JSON Object(TS object) & not as JSON string
  const postApiResponseBodyInJson = await postApiResponse.json();
  console.log(typeof postApiResponseBodyInJson);
  console.log(postApiResponseBodyInJson);
  //!👉 PRINT THE RESPONSE CODE AND MESSAGE
  console.log(` ${postApiResponse.status()} ${postApiResponse.statusText()}`);
  //!👉 PRINT WHETHER THE RESPONSE CODE IS IN RANGE 200 TO 299 OR NOT.
  console.log(
    ` Status code is in the range of 200-299 - ${postApiResponse.ok()}`
  );

  //!👉 ASSERT RESPONSE CODE
  expect(postApiResponse.status()).toBe(200);
  expect(postApiResponse.ok()).toBeTruthy();

  //!👉 ASSERT RESPONSE BODY
  expect(postApiResponseBodyInJson).toHaveProperty("bookingid");
  expect(postApiResponseBodyInJson).toHaveProperty(
    "booking.firstname",
    firstname
  );
  expect(postApiResponseBodyInJson).toHaveProperty(
    "booking.bookingdates.checkin",
    "2024-04-07"
  );
  expect(postApiResponseBodyInJson).toHaveProperty("booking.bookingdates", {
    checkin: "2024-04-07",
    checkout: "2024-05-15",
  });
  expect(postApiResponseBodyInJson.booking.firstname).toBe(firstname);
  expect(postApiResponseBodyInJson.booking.lastname).toBe(lastname);
  expect(postApiResponseBodyInJson.booking.bookingdates.checkin).toBe(
    "2024-04-07"
  );
  expect(Object.keys(postApiResponseBodyInJson)).toContainEqual("bookingid");
  expect(Object.keys(postApiResponseBodyInJson)).toStrictEqual([
    "bookingid",
    "booking",
  ]);
  expect(Object.keys(postApiResponseBodyInJson.booking)).toStrictEqual([
    "firstname",
    "lastname",
    "totalprice",
    "depositpaid",
    "bookingdates",
    "additionalneeds",
  ]);
  expect(typeof postApiResponseBodyInJson.booking.firstname).toBe("string");
});






