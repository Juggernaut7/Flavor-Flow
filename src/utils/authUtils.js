const USER_TOKEN_KEY = 'flavorflow_user_token';
const USER_ID_KEY = 'flavorflow_user_id';

export const loginUser = (username, password) => {
  if (username && password) {
    const mockToken = `mock-token-${username}-${Date.now()}`;
    const mockUserId = `user-${username.toLowerCase()}`;
    localStorage.setItem(USER_TOKEN_KEY, mockToken);
    localStorage.setItem(USER_ID_KEY, mockUserId);
    return { success: true, token: mockToken, userId: mockUserId, username };
  }
  return { success: false, message: 'Invalid credentials. Please provide both username and password.' };
};

export const registerUser = (username, password) => {
  if (username && password && password.length >= 6) {
    const mockToken = `mock-token-${username}-${Date.now()}`;
    const mockUserId = `user-${username.toLowerCase()}`;
    localStorage.setItem(USER_TOKEN_KEY, mockToken);
    localStorage.setItem(USER_ID_KEY, mockUserId);
    return { success: true, token: mockToken, userId: mockUserId, username };
  }
  return { success: false, message: 'Registration failed. Username and password (min 6 chars) required.' };
};

export const logoutUser = () => {
  localStorage.removeItem(USER_TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
};

export const getAuthStatus = () => {
  const token = localStorage.getItem(USER_TOKEN_KEY);
  const userId = localStorage.getItem(USER_ID_KEY);
  return { isAuthenticated: !!token, userId, username: userId ? userId.replace('user-', '') : null };
};