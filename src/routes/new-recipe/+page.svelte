<script lang="ts">
	import { ingredientStore } from '$lib/data';
	import { onDestroy } from 'svelte';
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';
	import Dropdown from './dropdown.svelte';

	let allIngredients: Ingredient[] = [];
	const unsubscribe = ingredientStore.subscribe((data) => {
		allIngredients = data;
	});

	onDestroy(() => {
		unsubscribe();
	});

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom-start'
	};

	const emptyRecipeIngredient: RecipeIngredient = {
		base_ingredient: '',
		name_in_recipe: '',
		is_optional: false,
		group_name: '',
		base_amount: 0,
		unit: '',
		base_ingredient_id: 0
	};

	type KeyedRecipeIngredient = RecipeIngredient & {
		key: string;
	};

	const ingredientUnits = [
		'g',
		'kg',
		'oz',
		'lb',
		'l',
		'dl',
		'cl',
		'ml',
		'cup',
		'tbsp',
		'tsp',
		'count',
		'slice',
		'cm',
		'inch',
		''
	];

	// type RecipeIngredient = {
	// name_no: string|null;
	// name_en: string|null;
	// id: number;
	// quantity: number;
	// is_ubiquitus: boolean;
	// }

	// form field values
	let language = 'no';
	let title = '';
	let description = '';
	let searchTerm = '';
	// let ubiquitus = false;

	let ingredients: KeyedRecipeIngredient[] = [];

	function addIngredient(ingredient: RecipeIngredient) {
		const key = Math.random().toString(36).substring(8);
		ingredients = [...ingredients, { ...ingredient, key }];
	}

	function handleSelectedIngredient(event: CustomEvent<AutocompleteOption<string>>) {
		const { label: base_ingredient, value: base_ingredient_id } = event.detail;
		addIngredient({
			...emptyRecipeIngredient,
			name_in_recipe: base_ingredient,
			base_ingredient,
			base_ingredient_id: Number(base_ingredient_id)
		});
	}

	function handleChangedIngredient(key: string, event: CustomEvent<AutocompleteOption<string>>) {
		const ingredient = ingredients.find((i) => i.key === key)!;
		const { label: base_ingredient, value: base_ingredient_id } = event.detail;
		ingredient.base_ingredient = base_ingredient;
		ingredient.base_ingredient_id = Number(base_ingredient_id);
		ingredient.name_in_recipe = base_ingredient;
		ingredients = [...ingredients];
	}

	// $: matchingIngredients = allIngredients.filter((existingIngredient) => {
	// 	return (
	// 		existingIngredient.name_no?.includes(searchTerm) ||
	// 		existingIngredient.name_en?.includes(searchTerm)
	// 	);
	// });

	function removeIngredient(key: string, e: PointerEvent) {
		console.log(e);
		if (e.pointerType == 'mouse') {
			ingredients = ingredients.filter((i) => i.key !== key);
		}
	}

	async function handleSubmit() {
		let recipe: Recipe = {} as Recipe;
		recipe.title = title;
		recipe.content = description;

		///

		// let matchingIngredient = matchingIngredients.filter((i) => {
		// 	return language == 'no' ? i.name_no == searchTerm : i.name_en == searchTerm;
		// });

		// let ingredientId: number;

		// if (matchingIngredient.length > 0) {
		// 	ingredientId = matchingIngredient[0].id;
		// } else {
		// 	ingredientId = await createIngredient(searchTerm);
		// }

		// let recipeIngredients = [
		// 	{
		// 		base_ingredient_id: ingredientId,
		// 		name_in_recipe: searchTerm
		// 	}
		// ];

		///
		let newRecipe = {
			title: title,
			content: description,
			ingredients: ingredients
		};

		const formdata = new FormData();
		formdata.append('hero_image', '');
		formdata.append('full_recipe', JSON.stringify(newRecipe));

		const res = await fetch('http://localhost:8000/api/recipes/recipes', {
			method: 'POST',
			body: formdata
		});

		const r = await res.json();
		if (res.ok) {
			alert('Recipe created!');
		} else {
			alert('Something went wrong:(' + r);
		}
	}

	async function createIngredient(name: string) {
		let newIng: NewIngredient = {
			name_en: language == 'en' ? name : null,
			name_no: language == 'no' ? name : null,
			is_ubiquitus: false
		};
		const res = await fetch('http://localhost:8000/api/recipes/ingredients', {
			method: 'POST',
			body: JSON.stringify(newIng)
		});
		const data = await res.json();
		if (res.ok) {
			let ingredient: Ingredient = { ...data };
			ingredientStore.set([...allIngredients, ingredient]);
			return ingredient.id;
		}
		alert('Something went wrong when creating the ingredient: ' + res.statusText);
		return -1;
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<div class="space-y-12">
		<h1 class="font-bold leading-7 text-4xl">Add Recipe🥗</h1>
		<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-9">
			<div class="sm:col-span-full">
				<label>Title</label>
				<input bind:value={title} class="input" />

				<label>Description</label>
				<textarea bind:value={description} rows="5" class="textarea" />
			</div>

			<div class="sm:col-span-full">
				<Dropdown
					key="AddIngredient"
					ingredientsList={allIngredients}
					handleSelection={handleSelectedIngredient}
				/>
			</div>

			<div class="sm:col-span-full">
				{#each ingredients as ingredient (ingredient.key)}
					<div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-9 group -z-10">
						<div class="sm:col-span-2 sm:col-start-1">
							<p>Ingredient</p>
							{#key ingredient.base_ingredient}
								<Dropdown
									key={ingredient.key}
									ingredientsList={allIngredients}
									handleSelection={(e) => handleChangedIngredient(ingredient.key, e)}
									value={ingredient.base_ingredient}
								/>
							{/key}
						</div>

						<div class="sm:col-span-3">
							<p>Name in recipe</p>
							<div class="input-group">
								<input
									type="text"
									placeholder="Name in recipe"
									bind:value={ingredient.name_in_recipe}
								/>
							</div>
						</div>

						<div class="sm:col-span-2">
							<p>Amount</p>
							<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
								<!-- <div class="input-group-shim">(icon)</div> TODO: sick icon -->
								<input type="text" placeholder="Amount" bind:value={ingredient.base_amount} />
								<select bind:value={ingredient.unit}>
									{#each ingredientUnits as unit}
										<option value={unit}>{unit}</option>
									{/each}
								</select>
							</div>
						</div>

						<div class="sm:col-span-1">
							<div>
								<br />
								<label class="flex items-center space-x-2">
									<input type="checkbox" class="checkbox" bind:value={ingredient.is_optional} />
									<p>Optional</p>
								</label>
							</div>
						</div>

						<div class="sm:col-span-1">
							<button
								on:click={(e) => removeIngredient(ingredient.key, e)}
								class="group-hover:opacity-100 opacity-0 transition-opacity">❌</button
							>
						</div>
					</div>
				{/each}
			</div>

			<button type="submit" class="button-primary">Submit</button>
		</div>
	</div>
</form>
