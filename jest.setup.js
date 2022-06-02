// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import fetch from "node-fetch"; //テスト環境ではfetchがないため、別ライブラリから用意
import { TextDecoder, TextEncoder } from "util";

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
}

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const noop = () => {};

Object.defineProperty(window, "scrollTo", { value: noop, writable: true });

// Mock Performance Observer for next/image
beforeAll(() => {
  const mockPerformanceObserver = jest.fn();
  mockPerformanceObserver.mockReturnValue({
    observe: () => null,
  });
  global.PerformanceObserver = mockPerformanceObserver;
});
