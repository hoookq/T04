function pad(num, size) { //provided to fill the leading zero.
    num = num.toString();           
    while (num.length < size)       
        num = "0" + num;            
    return num;                    
}

async function fetchPokemon(url) { // getting pokemon data
    try {
        const response = await fetch(url);  
        const data = await response.json(); 
        return data;                        // return pokemon data
    } catch (error) {
        console.error('Error', error); 
    }
}

async function fetchPokemons() { // getting and showing 
    try {

        const response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000");
        const jsonData = await response.json(); 
        const pokemons = jsonData.results;      

        const pokemonsDiv = document.getElementById('pokemons');

        for (const pokemon of pokemons) {

            const pokemonDiv = document.createElement('div'); // div for each pokemon
            pokemonDiv.setAttribute('class', 'pokemon');  
            pokemonDiv.setAttribute('id', pokemon.name);  

            const pokemonDetails = await fetchPokemon(pokemon.url); 

        // elements id image name type
            const pidElement = document.createElement('p');      
            pidElement.setAttribute('class', 'pid');            
            pidElement.textContent = `${pad(pokemonDetails.id, 3)}`; 
            pokemonDiv.appendChild(pidElement);                  

            const imageElement = document.createElement('img');  
            imageElement.setAttribute('src', pokemonDetails.sprites.front_default);
            pokemonDiv.appendChild(imageElement);                

            const nameElement = document.createElement('p');     
            nameElement.setAttribute('class', 'name');           
            nameElement.textContent = pokemonDetails.name.toUpperCase(); 
            pokemonDiv.appendChild(nameElement);                

            const typeElement = document.createElement('p');     
            typeElement.setAttribute('class', 'type');           
            const types = pokemonDetails.types.map(type => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)).join(', '); // Формируем строку с типами
            typeElement.textContent = `${types}`;               
            pokemonDiv.appendChild(typeElement);                 

            pokemonsDiv.appendChild(pokemonDiv);
        }
    } catch (error) {
        console.error('Error', error); 
    }
}

window.onload = fetchPokemons;
