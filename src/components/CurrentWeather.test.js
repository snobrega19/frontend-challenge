import React from "react";
import { render, screen } from "@testing-library/react";
import Modal from "./Modal";
import CurrentWeather from "./CurrentWeather";

test("Renders without info", () => {
  render(<CurrentWeather />);
  screen.debug();
});
