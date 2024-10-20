const BASE_URL = 'http://localhost:5001';

export const fetchFn = async (path: string) => {
  const response = await fetch(`${BASE_URL}/${path}`);

  if (!response.ok) {
    throw new Error('Network response was NOT ok');
  }

  return response;
};
