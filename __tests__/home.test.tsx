import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "@/app/page";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Mock axios
const mock = new MockAdapter(axios);

describe('Home Component', () => {
  beforeEach(() => {
    window.alert = jest.fn();
    mock.reset();
  });

  test('renders the Home component with Add and Search sections', () => {
    render(<Home />);

    // Check if the component renders the title and input fields
    expect(screen.getByText('Synonyms Tool')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Word')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Synonym')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search Word')).toBeInTheDocument();
  });

  test('displays an error if the add synonym fields are empty', async () => {
    render(<Home />);

    // Click on the Add button without entering word or synonym
    const addButton = screen.getByRole('button', { name: 'Add Synonym' });
    fireEvent.click(addButton);

    // Check for the error message
    expect(await screen.findByText('Both word and synonym are required.')).toBeInTheDocument();
  });

  test('successfully adds a synonym when valid input is provided', async () => {
    // Mock the API response for adding a synonym
    mock.onPost('/api/synonyms/add').reply(200, { message: 'Synonym added successfully!' });

    render(<Home />);

    // Enter a word and synonym
    fireEvent.change(screen.getByPlaceholderText('Word'), { target: { value: 'car' } });
    fireEvent.change(screen.getByPlaceholderText('Synonym'), { target: { value: 'vehicle' } });

    // Submit the form
    const addButton = screen.getByRole('button', { name: 'Add Synonym' });
    fireEvent.click(addButton);

    // Wait for the success alert or message
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Synonym added successfully!'));
  });

  test('displays an error when searchWord is empty during search', async () => {
    render(<Home />);

    // Try searching without a word
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    // Expect an error message to be displayed
    expect(await screen.findByText('Please enter a word to search for synonyms.')).toBeInTheDocument();
  });

  test('successfully retrieves synonyms when a valid search word is provided', async () => {
    // Mock the API response for searching synonyms
    mock.onGet('/api/synonyms/car').reply(200, { synonyms: ['vehicle', 'automobile'] });

    render(<Home />);

    // Enter a search word
    fireEvent.change(screen.getByPlaceholderText('Search Word'), { target: { value: 'car' } });

    // Submit the search
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    // Wait for the list of synonyms to appear
    await waitFor(() => {
      expect(screen.getByText('vehicle')).toBeInTheDocument();
      expect(screen.getByText('automobile')).toBeInTheDocument();
    });
  });

  test('handles search error gracefully if search fails', async () => {
    // Mock the API to fail
    mock.onGet('/api/synonyms/car').reply(500);

    render(<Home />);

    // Enter a search word
    fireEvent.change(screen.getByPlaceholderText('Search Word'), { target: { value: 'car' } });

    // Submit the search
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    // Expect the error message to be shown
    await waitFor(() => expect(screen.getByText('Failed to search synonym')).toBeInTheDocument());
  });
});
