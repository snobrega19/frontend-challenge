import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import Modal from "./Modal";

test("Shows a modal with a specific message", () => {
  const message = "This is a test message";
  render(<Modal show={true} title="Test modal" message={message} />);
  expect(screen.getByText(/test modal/i)).toBeInTheDocument();
  expect(screen.getByTestId("modal-message")).toHaveTextContent(message);
});

// test("Click on 'no' button and close modal", async () => {
//   let showModal = true;
//   render(
//     <Modal
//       show={showModal}
//       title="Test modal"
//       onCancelClick={() => (showModal = false)}
//     />
//   );
//   fireEvent.click(screen.getByRole("button", { name: /no/i }));

//   expect(screen.getByText(/test modal/i)).not.toBeInTheDocument();
//   screen.debug();
// });
