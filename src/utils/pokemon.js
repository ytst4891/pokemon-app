export const getAllPokemon = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

export const getPokemon = async (url) => {
  const response = await fetch(url);
  return await response.json();
};
