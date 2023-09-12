/* eslint-disable no-undef */
import * as React from "react";
import { cleanup, render } from "@testing-library/react";

import MessageContainer from "../MessageContainer";

// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it("MessageContainer deve exibir texto", () => {
  const textMessage = "testheader";

  const { getByText } = render(
    <MessageContainer type="success" message={textMessage} />,
  );

  expect(getByText(/testheader/i)).toBeTruthy();
});
