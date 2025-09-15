import React from 'react';
import { render } from '@testing-library/react';
import { Container } from './Container';

describe('Container', () => {
  it('renders children', () => {
    const { getByText } = render(<Container>Hey</Container>);
    expect(getByText('Hey')).toBeInTheDocument();
  });
});
