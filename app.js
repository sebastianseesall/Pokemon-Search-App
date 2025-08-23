document.getElementById("searchBtn").addEventListener("click", fetchPokemon);

async function fetchPokemon() {
  const input = document.getElementById("pokemonInput").value.toLowerCase().trim();
  const resultDiv = document.getElementById("pokemonResult");

  if (!input) {
    resultDiv.innerHTML = `<p>Please enter a Pokémon name or ID.</p>`;
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
    if (!response.ok) throw new Error("Pokémon not found");
    
    const data = await response.json();
    
    const name = data.name;
    const image = data.sprites.front_default;
    const type = data.types.map(t => t.type.name).join(", ");

    resultDiv.innerHTML = `
      <h2>${name.toUpperCase()}</h2>
      <img src="${image}" alt="${name}">
      <p>Type: ${type}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
  }
}
