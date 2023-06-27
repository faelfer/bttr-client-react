/* eslint-disable no-undef */
import * as React from 'react';
import { cleanup, render } from '@testing-library/react';

import DescriptionForm from '../DescriptionForm';

// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('DescriptionForm deve exibir texto', () => {
  const textDescription = 'testdescription';

  const { getByText } = render(
    <DescriptionForm description={textDescription} />,
  );

  expect(getByText(/testdescription/i)).toBeTruthy();
});
