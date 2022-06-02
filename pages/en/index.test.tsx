/**
 * @jest-environment jsdom
 */

import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { getPage, initTestHelpers } from "next-page-tester";
import { setupServer } from "msw/node";

initTestHelpers();

const handlers = [
  rest.get("https://api.github.com/users/maronz7", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        login: "Mock Test",
      })
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => {
  server.close();
});

describe("index.tsx", () => {
  it("Should render the page", async () => {
    // ページを取得する
    const { page } = await getPage({
      route: "/en/",
    });
    // renderでpageの内容を取得する
    render(page);

    //トップページのテキストが取得できるまで待機する
    expect(await screen.findByText("Welcome to En")).toBeInTheDocument();
    // トップページの内容がDOMに表示されているかを確認する
    expect(screen.getByText("Mock Test")).toBeInTheDocument();
  });
});
