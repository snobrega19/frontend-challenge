import React from "react";
import { render, screen } from "@testing-library/react";
import StatusBar from "./StatusBar";

test("Shows a bar with a success message", () => {
  const message = "This is a success message";
  render(<StatusBar variant="success" message={message} />);
  const statusBar = screen.getByTestId("status-bar");
  expect(statusBar).toHaveTextContent(message);
  expect(statusBar).toHaveClass("alert-success");
});

test("Shows a bar with a message with danger variant", () => {
  const message = "This is a error message";
  render(<StatusBar variant="danger" message={message} />);
  const statusBar = screen.getByTestId("status-bar");
  expect(statusBar).toHaveTextContent(message);
  expect(statusBar).toHaveClass("alert-danger");
});