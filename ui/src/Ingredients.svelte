<script>
    import { ListGroup, ListGroupItem } from "sveltestrap";
    import { formatGroupedQuantity } from "./quantity";

    import { hasList } from "./store.js";

    export let ingredients;

    function sorted(a, b) {
        return a.name.localeCompare(b.name);
    }

    function toggleHasItems(ingredient) {
        if (
            $hasList.filter((item) => item.name == ingredient.name).length > 0
        ) {
            hasList.remove(ingredient.name);
        } else {
            hasList.add({
                name: ingredient.name,
                quantity: ingredient.quantity,
            });
        }
    }

    function hasIngredient(ingredient) {
        return (
            $hasList.filter((item) => item.name == ingredient.name).length > 0
        );
    }
</script>

<ListGroup>
    {#key $hasList}
        {#each ingredients.sort(sorted) as ingredient}
            <ListGroupItem
                class="list-group-item d-flex justify-content-between align-items-center border-0"
            >
                <span
                    style={hasIngredient(ingredient)
                        ? "color: grey; text-decoration: line-through;"
                        : ""}
                    on:click={() => toggleHasItems(ingredient)}
                    >{ingredient.name}</span
                >
                <span class="text-muted"
                    >{formatGroupedQuantity(ingredient.quantity)}</span
                >
            </ListGroupItem>
        {/each}
    {/key}
</ListGroup>
