/* eslint-disable no-undef */
import * as React from "react";
import { cleanup, render } from "@testing-library/react";

import MessageContainer from "../MessageContainer";

// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it("MessageContainer deve exibir texto", () => {
  const textMessage = "testmessage";

  const { getByText } = render(<MessageContainer message={textMessage} />);

  expect(getByText(/testmessage/i)).toBeTruthy();
});
