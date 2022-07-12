import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";
const message = "This is a test message";

test(`Shows a modal with '${message}' message`, () => {
  render(<Modal show={true} title="Test modal" message={message} />);
  expect(screen.getByText(/test modal/i)).toBeInTheDocument();
  expect(screen.getByTestId("modal-message")).toHaveTextContent(message);
});

test("Click on 'no' button", async () => {
  const closeModal = jest.fn();
  render(<Modal show={true} title="Test modal" onCancelClick={closeModal} />);
  fireEvent.click(screen.getByRole("button", { name: /no/i }));
  expect(closeModal).toHaveBeenCalled();
});

test("Click on 'yes' button", async () => {
  const closeModal = jest.fn();
  render(<Modal show={true} title="Test modal" onButtonClick={closeModal} />);
  fireEvent.click(screen.getByRole("button", { name: /yes/i }));
  expect(closeModal).toHaveBeenCalled();
});
