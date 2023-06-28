/* eslint-disable no-undef */
import * as React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import LinkRedirect from '../LinkRedirect';

// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('LinkRedirect deve exibir texto descritivo da url', () => {
  const textDescription = 'testdescription1 ';
  const textDescriptionUrl = 'testurl1';

  render(
    <MemoryRouter>
      <LinkRedirect
        description={textDescription}
        urlTo="/"
        descriptionUrl={textDescriptionUrl}
      />
    </MemoryRouter>,
  );

  const regexCaseInsensiDescription = new RegExp(textDescription + textDescription, 'i');

  expect(screen.getByText(regexCaseInsensiDescription)).toBeInTheDocument();
});
