import { render, screen, fireEvent } from '@testing-library/react';
import UserList from './UserList';

describe('UserList Component', () => {
  const mockUsers = [
    {
      id: 1,
      name: 'Mr. John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      phone: '1-234-567-8900 x12345',
    },
    {
      id: 2,
      name: 'Dr. Jane Smith',
      username: 'janesmith',
      email: 'jane@example.com',
      phone: '(555) 123-4567',
    },
  ];

  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders table with correct headers', () => {
    render(<UserList users={[]} onDelete={mockOnDelete} onEdit={mockOnEdit} />);

    const headers = ['ID', 'First Name', 'Last Name', 'Username', 'Email', 'Phone', 'Actions'];
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  test('renders user data correctly with name title removed', () => {
    render(<UserList users={mockUsers} onDelete={mockOnDelete} onEdit={mockOnEdit} />);

    // Check first user
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('johndoe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('12345678900')).toBeInTheDocument();

    // Check second user
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('Smith')).toBeInTheDocument();
    expect(screen.getByText('janesmith')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('5551234567')).toBeInTheDocument();
  });

  test('calls onDelete with correct user id when delete button is clicked', () => {
    render(<UserList users={mockUsers} onDelete={mockOnDelete} onEdit={mockOnEdit} />);

    const deleteButtons = screen.getAllByRole('button', { name: 'Delete' });
    fireEvent.click(deleteButtons[0]); // Click first delete button

    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  test('calls onEdit with correct user data when edit button is clicked', () => {
    render(<UserList users={mockUsers} onDelete={mockOnDelete} onEdit={mockOnEdit} />);

    const editButtons = screen.getAllByRole('button', { name: 'Edit' });
    fireEvent.click(editButtons[0]); // Click first edit button

    expect(mockOnEdit).toHaveBeenCalledWith(mockUsers[0]);
  });

  test('handles empty users array', () => {
    render(<UserList users={[]} onDelete={mockOnDelete} onEdit={mockOnEdit} />);

    expect(screen.getByText('No users available')).toBeInTheDocument();
  });

  test('normalizes phone numbers correctly', () => {
    render(<UserList users={mockUsers} onDelete={mockOnDelete} onEdit={mockOnEdit} />);

    // Check if phone numbers are normalized (only digits)
    expect(screen.getByText('12345678900')).toBeInTheDocument();
    expect(screen.getByText('5551234567')).toBeInTheDocument();
  });
});
