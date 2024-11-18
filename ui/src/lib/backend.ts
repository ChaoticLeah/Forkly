const DOMAIN = "http://127.0.0.1:9080/" //set to / for production

export const fetchRecipes = (async () => {
    const response = await fetch(`${DOMAIN}api/recipes`);
    return await response.json();
})


export const fetchRecipe = (async (path: string) => {
    const response = await fetch(`${DOMAIN}api/recipes/${path}`);
    const json = await response.json();
    return json["recipe"]["value"];
})


export const fetchShoppingList = (async (recipes: string[]) => {
    const response = await fetch(`${DOMAIN}api/shopping_list`,{
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(recipes)
    });

    return await response.json();
})