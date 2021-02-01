import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders pre approve form", () => {
  render(<App />);
  const formElement = screen.getByText(/Vehicle Price/i);
  expect(formElement).toBeInTheDocument();
});
