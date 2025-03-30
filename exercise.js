/*
In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id).
Questa funzione accetta un id di una ricetta e deve:

- Recuperare la ricetta da https://dummyjson.com/recipes/{id}
- Estrarre la proprietà userId dalla ricetta
- Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
- Restituire la data di nascita dello chef
*/


async function getChefBrithday(recipeId) {
	let recipeData;
	try {
		const recipeResponse = await fetch(`https://dummyjson.com/recipes/${recipeId}`)
		recipeData = await recipeResponse.json();
	} catch (error) {
		throw new Error(`Errore durante il recupero della ricetta con id ${recipeId}`)
	}
	if (recipeData.message) {
		throw new Error(recipeData.message)
	}

	let chefData;
	try {
		const chefResponse = await fetch(`https://dummyjson.com/users/${recipeData.userId}`);
		chefData = await chefResponse.json();
	} catch (error) {
		throw new Error(`Errore durante il recupero dello chef con id ${recipeData.userId}`)
	}
	if (chefData.message) {
		throw new Error(chefData.message)
	}

	return dayjs(chefData.birthDate).format("DD/MM/YYYY")
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