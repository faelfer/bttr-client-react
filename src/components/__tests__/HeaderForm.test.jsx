/* eslint-disable no-undef */
import * as React from "react";
import { cleanup, render } from "@testing-library/react";

import HeaderForm from "../HeaderForm";

// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it("HeaderForm deve exibir texto", () => {
  const textHeader = "testheader";

  const { getByText } = render(<HeaderForm title={textHeader} />);

  expect(getByText(/testheader/i)).toBeTruthy();
});
