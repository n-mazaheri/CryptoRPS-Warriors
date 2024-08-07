const BASE_URL = process.env.REACT_APP_BASE_URL;

export async function postData(endpoint = '', data = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return response.json();
  }
  return null;
}

export async function getData(endpoint = '') {
  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    return response.json();
  }
  return null;
}

export const readJson = (filePath, setFunc) => {
  // Fetch the JSON file
  fetch(filePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setFunc(data);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
};

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function generateSalt(length = 16) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}
