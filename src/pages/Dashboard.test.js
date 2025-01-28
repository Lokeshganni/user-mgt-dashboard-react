import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from './Dashboard';
import { getUsers, addUser, deleteUser, updateUser } from '../services/userService';

// Mock the services
jest.mock('../services/userService');

// Mock child components
jest.mock('../components/UserList', () => ({ users, onDelete, onEdit }) => (
  <div data-testid="mock-user-list">
    {users.map(user => (
      <div key={user.id} data-testid={`user-${user.id}`}>
        {user.name}
        <button onClick={() => onDelete(user.id)}>Delete</button>
        <button onClick={() => onEdit(user)}>Edit</button>
      </div>
    ))}
  </div>
));

jest.mock('../components/Modal/Modal', () => ({ children, isOpen, onClose }) => (
  isOpen ? <div data-testid="mock-modal">{children}</div> : null
));

jest.mock('../components/UserForm/UserForm', () => ({ onSubmit, initialValues }) => (
  <form
    data-testid="mock-user-form"
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit(initialValues);
    }}
  >
    <button type="submit">Submit</button>
  </form>
));

describe('Dashboard Component', () => {
  const mockUsers = [
    { id: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com', phone: '1234567890' },
    { id: 2, name: 'Jane Smith', username: 'janesmith', email: 'jane@example.com', phone: '0987654321' },
  ];

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    // Set up default mock implementations
    getUsers.mockResolvedValue([...mockUsers]);
    addUser.mockImplementation(user => Promise.resolve({ ...user, id: Math.random() }));
    deleteUser.mockImplementation((id) => {
      const index = mockUsers.findIndex(user => user.id === id);
      if (index > -1) mockUsers.splice(index, 1);
      return Promise.resolve();
    });
    updateUser.mockImplementation((id, user) => Promise.resolve({ ...user, id }));
  });

  test('loads and displays users on mount', async () => {
    render(<Dashboard />);

    // Wait for users to be loaded
    await waitFor(() => {
      expect(getUsers).toHaveBeenCalledTimes(1);
    });

    // Check if UserList received the correct props
    expect(screen.getByTestId('mock-user-list')).toBeInTheDocument();
    expect(screen.getByTestId('user-1')).toHaveTextContent('John Doe');
    expect(screen.getByTestId('user-2')).toHaveTextContent('Jane Smith');
  });

  test('search functionality filters users correctly', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(getUsers).toHaveBeenCalled();
    });

    const searchInput = screen.getByPlaceholderText('Search user by first or last name');
    fireEvent.change(searchInput, { target: { value: 'john' } });

    await waitFor(() => {
      expect(screen.getByTestId('user-1')).toBeInTheDocument();
    });
  });

  test('opens add user modal when clicking add user button', async () => {
    render(<Dashboard />);

    const addButton = screen.getByText('Add User');
    fireEvent.click(addButton);

    expect(screen.getByTestId('mock-modal')).toBeInTheDocument();
    expect(screen.getByTestId('mock-user-form')).toBeInTheDocument();
  });

  test('deletes user when delete button is clicked', async () => {
    render(<Dashboard />);

    // Wait for users to load
    await waitFor(() => {
      expect(getUsers).toHaveBeenCalled();
    });

    // Simulate delete
    const deleteButton = screen.getAllByText('Delete')[0];
    fireEvent.click(deleteButton);

    // Wait for the DOM to update
    await waitFor(() => {
      expect(screen.queryByTestId('user-1')).not.toBeInTheDocument();
    });

    // Verify notification
    expect(screen.getByText('User successfully deleted')).toBeInTheDocument();
  });

  test('opens edit modal with user data when edit button is clicked', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(getUsers).toHaveBeenCalled();
    });

    const editButton = screen.getAllByText('Edit')[0];
    fireEvent.click(editButton);

    expect(screen.getByTestId('mock-modal')).toBeInTheDocument();
    expect(screen.getByTestId('mock-user-form')).toBeInTheDocument();
  });

  test('shows notification when user is added', async () => {
    render(<Dashboard />);

    // Open add user modal
    fireEvent.click(screen.getByText('Add User'));

    // Submit the form
    fireEvent.submit(screen.getByTestId('mock-user-form'));

    await waitFor(() => {
      expect(screen.getByText('User successfully added')).toBeInTheDocument();
    });

    // Wait for notification to disappear
    await waitFor(() => {
      expect(screen.queryByText('User successfully added')).not.toBeInTheDocument();
    }, { timeout: 4000 });
  });

  test('shows notification when user is updated', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(getUsers).toHaveBeenCalled();
    });

    // Click edit button
    const editButton = screen.getAllByText('Edit')[0];
    fireEvent.click(editButton);

    // Submit the form
    fireEvent.submit(screen.getByTestId('mock-user-form'));

    await waitFor(() => {
      expect(screen.getByText('User details updated successfully')).toBeInTheDocument();
    });
  });
});
