import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddUserForm from './UserForm';

describe('AddUserForm Component', () => {
  const mockInitialValues = {
    name: '',
    username: '',
    email: '',
    phone: ''
  };

  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form with all required fields', () => {
    render(<AddUserForm initialValues={mockInitialValues} onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add User' })).toBeInTheDocument();
  });

  test('shows "Update User" button text when editing existing user', () => {
    const existingUser = {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      phone: '1234567890'
    };

    render(<AddUserForm initialValues={existingUser} onSubmit={mockOnSubmit} />);
    expect(screen.getByRole('button', { name: 'Update User' })).toBeInTheDocument();
  });

  test('updates form values when user types', async () => {
    render(<AddUserForm initialValues={mockInitialValues} onSubmit={mockOnSubmit} />);

    const nameInput = screen.getByLabelText('Full Name');
    const usernameInput = screen.getByLabelText('Username');
    const emailInput = screen.getByLabelText('Email');
    const phoneInput = screen.getByLabelText('Phone');

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(usernameInput, 'johndoe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(phoneInput, '1234567890');

    expect(nameInput).toHaveValue('John Doe');
    expect(usernameInput).toHaveValue('johndoe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(phoneInput).toHaveValue('1234567890');
  });

  test('calls onSubmit with form data when form is submitted', async () => {
    render(<AddUserForm initialValues={mockInitialValues} onSubmit={mockOnSubmit} />);

    const formData = {
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      phone: '1234567890'
    };

    await userEvent.type(screen.getByLabelText('Full Name'), formData.name);
    await userEvent.type(screen.getByLabelText('Username'), formData.username);
    await userEvent.type(screen.getByLabelText('Email'), formData.email);
    await userEvent.type(screen.getByLabelText('Phone'), formData.phone);

    fireEvent.submit(screen.getByRole('form'));

    expect(mockOnSubmit).toHaveBeenCalledWith(formData);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  test('validates required fields', async () => {
    render(<AddUserForm initialValues={mockInitialValues} onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);

    // Check if HTML5 validation is working by verifying the form wasn't submitted
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('validates email format', async () => {
    render(<AddUserForm initialValues={mockInitialValues} onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText('Email');
    await userEvent.type(emailInput, 'invalid-email');

    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);

    // Check if HTML5 validation is working by verifying the form wasn't submitted
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('initializes form with provided values', () => {
    const existingUser = {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      phone: '1234567890'
    };

    render(<AddUserForm initialValues={existingUser} onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText('Full Name')).toHaveValue(existingUser.name);
    expect(screen.getByLabelText('Username')).toHaveValue(existingUser.username);
    expect(screen.getByLabelText('Email')).toHaveValue(existingUser.email);
    expect(screen.getByLabelText('Phone')).toHaveValue(existingUser.phone);
  });
});