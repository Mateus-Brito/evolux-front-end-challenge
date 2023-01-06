import Paginate from "@components/paginate";
import { render, fireEvent } from "@testing-library/react";

test("renders the correct number of page buttons", () => {
  const mockFn = jest.fn();
  const { container } = render(
    <Paginate totalResults={50} currentPage={3} setPage={mockFn} />
  );
  expect(container.getElementsByClassName("page-button").length).toEqual(5);
});

test("marks the current page button as active", () => {
  const mockFn = jest.fn();
  const { container } = render(
    <Paginate totalResults={50} currentPage={3} setPage={mockFn} />
  );
  expect(container.querySelector(".button-active").textContent).toEqual("3");
});

test("calls the correct callback function when a page button is clicked", () => {
  const mockFn = jest.fn();
  const { container } = render(
    <Paginate totalResults={50} currentPage={3} setPage={mockFn} />
  );
  fireEvent.click(container.getElementsByClassName("page-button")?.[3])
  expect(mockFn).toHaveBeenCalledWith(4);
});
