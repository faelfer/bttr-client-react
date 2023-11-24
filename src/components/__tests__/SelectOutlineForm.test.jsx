/* eslint-disable no-undef */
import * as React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SelectOutlineForm from "../SelectOutlineForm";

it("SelectOutlineForm deve chamar o manipulador onChangeSelect com o novo valor do select", async () => {
  const onChangeSelectSpy = jest.fn();
  const selectValueDefault = "";
  const selectOptions = [{ id: "1", value: "testselectoutlineform" }];

  render(
    <SelectOutlineForm
      selectPlaceholder="outline-select"
      options={selectOptions}
      selectValue={selectValueDefault}
      onChangeSelect={onChangeSelectSpy}
    />,
  );

  const select = screen.getByTestId("outline-form-select");

  userEvent.selectOptions(select, [selectOptions[0].value]);

  expect(onChangeSelectSpy).toHaveBeenCalledWith(selectOptions[0].id);
});
