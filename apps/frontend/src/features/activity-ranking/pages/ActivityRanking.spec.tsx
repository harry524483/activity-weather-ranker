import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { ActivityRanking } from './ActivityRanking';

const ui = {
  header: () => screen.getByRole('heading'),
  searchInput: () => screen.getByRole('combobox'),
  searchPlaceholder: () => screen.getByText('Search for a location...'),
};

describe('ActivityRanking', () => {
  it('renders the header and search input', () => {
    // Arrange
    render(
      <MockedProvider mocks={[]}>
        <ActivityRanking />
      </MockedProvider>
    );

    // Assert
    expect(ui.header()).toBeInTheDocument();
    expect(ui.searchInput()).toBeInTheDocument();
    expect(ui.searchPlaceholder()).toBeInTheDocument();
  });
});
