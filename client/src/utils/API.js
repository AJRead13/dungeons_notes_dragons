const prefix = 'https://www.dnd5eapi.co/api/';

export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const getRaceInfo = async (race) => {
  const response = await fetch(`${prefix}/races/${race}`);
  const data = await response.json();
  return data;
}

export const getClassInfo = async (charClass) => {
  const response = await fetch(`${prefix}/classes/${charClass}`);
  const data = await response.json();
  return data;
}

