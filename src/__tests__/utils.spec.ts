import { insertInHead, wrapValueWithQuotes } from "../utils";

const testData = `---
title: Jestip, clear mocks automatically
published: true
description: How to clear mocks without the clearAllMocks function
cover_image: https://thepracticaldev.s3.amazonaws.com/i/91mq6tpua5op66kj38l8.jpg
tags: jest
---

Let's take the following code as example.
`;

it("should insert data in head", () => {
  expect(insertInHead(testData, { data: "La date du jour" }))
    .toMatchInlineSnapshot(`
    "---
    title: \\"Jestip, clear mocks automatically\\"
    published: \\"true\\"
    description: \\"How to clear mocks without the clearAllMocks function\\"
    cover_image: \\"https://thepracticaldev.s3.amazonaws.com/i/91mq6tpua5op66kj38l8.jpg\\"
    tags: \\"jest\\"
    data: \\"La date du jour\\"
    ---

    Let's take the following code as example.
    "
  `);
});

it("should wrap values with quotes", () => {
  expect(wrapValueWithQuotes("hello:  ")).toBe("hello:");
  expect(wrapValueWithQuotes('hello: "there"')).toBe('hello: "there"');
  expect(wrapValueWithQuotes("hello: there")).toBe('hello: "there"');
  expect(wrapValueWithQuotes("hello: there:with:dots")).toBe(
    'hello: "there:with:dots"'
  );
});
