import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { getUsers, getUser, addUser, updateUser, deleteUser } from './apiService';

// Mock API data
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

// Set up MSW server
const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
    return res(ctx.json(mockUsers));
  }),
  rest.get('https://jsonplaceholder.typicode.com/users/:id', (req, res, ctx) => {
    const { id } = req.params;
    const user = mockUsers.find((u) => u.id === parseInt(id));
    return user ? res(ctx.json(user)) : res(ctx.status(404));
  }),
  rest.post('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
    const newUser = { id: mockUsers.length + 1, ...req.body };
    mockUsers.push(newUser);
    return res(ctx.status(201), ctx.json(newUser));
  }),
  rest.put('https://jsonplaceholder.typicode.com/users/:id', (req, res, ctx) => {
    const { id } = req.params;
    const index = mockUsers.findIndex((u) => u.id === parseInt(id));
    if (index !== -1) {
      mockUsers[index] = { ...mockUsers[index], ...req.body };
      return res(ctx.json(mockUsers[index]));
    }
    return res(ctx.status(404));
  }),
  rest.delete('https://jsonplaceholder.typicode.com/users/:id', (req, res, ctx) => {
    const { id } = req.params;
    const index = mockUsers.findIndex((u) => u.id === parseInt(id));
    if (index !== -1) {
      mockUsers.splice(index, 1);
      return res(ctx.status(204));
    }
    return res(ctx.status(404));
  })
);

// Enable the MSW server
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('API Service', () => {
  test('fetches all users', async () => {
    const users = await getUsers();
    expect(users).toEqual(mockUsers);
  });

  test('fetches a single user by ID', async () => {
    const user = await getUser(1);
    expect(user).toEqual(mockUsers[0]);
  });

  test('returns 404 when fetching a non-existing user', async () => {
    server.use(
      rest.get('https://jsonplaceholder.typicode.com/users/:id', (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    await expect(getUser(999)).rejects.toThrow();
  });

  test('adds a new user', async () => {
    const newUser = { name: 'New User', email: 'newuser@example.com' };
    const addedUser = await addUser(newUser);

    expect(addedUser).toMatchObject({
      id: expect.any(Number),
      name: 'New User',
      email: 'newuser@example.com',
    });
    expect(mockUsers).toContainEqual(addedUser);
  });

  test('updates an existing user', async () => {
    const updatedUser = { name: 'Updated Name', email: 'updated@example.com' };
    const result = await updateUser(1, updatedUser);

    expect(result).toEqual({ id: 1, name: 'Updated Name', email: 'updated@example.com' });
    expect(mockUsers[0]).toEqual(result);
  });

  test('returns 404 when updating a non-existing user', async () => {
    server.use(
      rest.put('https://jsonplaceholder.typicode.com/users/:id', (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    const updatedUser = { name: 'Nonexistent', email: 'nonexistent@example.com' };
    await expect(updateUser(999, updatedUser)).rejects.toThrow();
  });

  test('deletes an existing user', async () => {
    await deleteUser(1);

    expect(mockUsers.find((user) => user.id === 1)).toBeUndefined();
  });

  test('returns 404 when deleting a non-existing user', async () => {
    server.use(
      rest.delete('https://jsonplaceholder.typicode.com/users/:id', (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    await expect(deleteUser(999)).rejects.toThrow();
  });
});
