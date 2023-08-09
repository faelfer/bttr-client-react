/* eslint-disable no-undef */
import * as React from 'react';
import {
  cleanup,
  render,
  screen,
  fireEvent,
} from '@testing-library/react';

import LinkRedirect from '../LinkRedirect';

// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('LinkRedirect deve exibir texto descritivo', () => {
  const onRedirectSpy = jest.fn();
  const textDescription = 'testdescription1';
  const textDescriptionUrl = 'testurl1';

  const { getByText } = render(
    <LinkRedirect
      description={textDescription}
      descriptionUrl={textDescriptionUrl}
      onRedirect={onRedirectSpy}
    />,
  );

  const regexCaseInsensiDescription = new RegExp(textDescription, 'i');

  expect(getByText(regexCaseInsensiDescription)).toBeTruthy();
});

it('LinkRedirect deve exibir texto descritivo da url', () => {
  const onRedirectSpy = jest.fn();
  const textDescription = 'testdescription2';
  const textDescriptionUrl = 'testurl2';

  const { getByText } = render(
    <LinkRedirect
      description={textDescription}
      descriptionUrl={textDescriptionUrl}
      onRedirect={onRedirectSpy}
    />,
  );
  const regexCaseInsensiDescriptionUrl = new RegExp(textDescriptionUrl, 'i');

  expect(getByText(regexCaseInsensiDescriptionUrl)).toBeTruthy();
});

it('LinkRedirect deve chamar o manipulador onRedirect', () => {
  const onRedirectSpy = jest.fn();
  const textDescription = 'testdescription3';
  const textDescriptionUrl = 'testurl3';

  render(
    <LinkRedirect
      description={textDescription}
      descriptionUrl={textDescriptionUrl}
      onRedirect={onRedirectSpy}
    />,
  );

  const buttonRedirect = screen.getByTestId('link-redirect-button');

  fireEvent.click(buttonRedirect);

  expect(onRedirectSpy).toHaveBeenCalled();
});
