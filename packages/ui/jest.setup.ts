import '@testing-library/jest-dom';
// jsdom shims for Radix/Floating UI interactions
// eslint-disable-next-line @typescript-eslint/no-empty-function
Element.prototype.scrollIntoView = Element.prototype.scrollIntoView || (function () {} as any);
// eslint-disable-next-line @typescript-eslint/no-empty-function
Element.prototype.hasPointerCapture =
  Element.prototype.hasPointerCapture ||
  (function () {
    return false;
  } as any);
// eslint-disable-next-line @typescript-eslint/no-empty-function
Element.prototype.releasePointerCapture =
  Element.prototype.releasePointerCapture || (function () {} as any);

// ResizeObserver shim for Radix Slider
class ResizeObserverMock {
  callback: ResizeObserverCallback;
  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}
(global as any).ResizeObserver = (global as any).ResizeObserver || ResizeObserverMock;
