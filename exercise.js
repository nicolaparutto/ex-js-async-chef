/*
In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id).
Questa funzione accetta un id di una ricetta e deve:

- Recuperare la ricetta da https://dummyjson.com/recipes/{id}
- Estrarre la proprietà userId dalla ricetta
- Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
- Restituire la data di nascita dello chef
*/


async function getChefBrithday(recipeId) {
	const recipeResponse = await fetch(`https://dummyjson.com/recipes/${recipeId}`)
	const recipeData = await recipeResponse.json();
	const chefResponse = await fetch(`https://dummyjson.com/users/${recipeData.userId}`);
	const chefData = await chefResponse.json();
	return chefData.birthDate
}

(async () => {
	try {
		const chefBirthday = await getChefBrithday(1);
		console.log("Data di nascita dello chef:", chefBirthday)
	} catch (error) {
		console.error(error.message)
	} finally {
		console.log('Operazione completata')
	}
})();