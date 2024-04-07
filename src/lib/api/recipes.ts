import { useQuery } from '@tanstack/react-query';

const baseUrl = 'http://127.0.0.1:8000'

export function useIngredients() {
  const { data: ingredients } = useQuery<Ingredient[]>({
    queryKey: ['ingredients-list'],
    queryFn: () =>
      fetch(`${baseUrl}/api/recipes/ingredients`).then((r) =>
        r.json()
      ),
    initialData: [],
  });

  return ingredients;
}

export function useRecipes() {
  const { data: recipes } = useQuery<RecipeSummary[]>({
    queryKey: ['recipe-list'],
    queryFn: () =>
      fetch(`${baseUrl}/api/recipes/recipes`).then((r) => r.json()),
    initialData: [],
  });

  return recipes;
}

export function useRecipe(id: number) {
  const { data: recipe } = useQuery<Recipe | null>({
    queryKey: ['recipe-detail', id],
    queryFn: () =>
      fetch(`${baseUrl}/api/recipes/recipe/${id}`).then((r) =>
        r.json()
      ),
    initialData: null,
  });

  return recipe;
}

export function createIngredient(
  name_en: string | null,
  name_no: string | null,
  is_ubiquitus: boolean
) {
  const ingredient = { name_en, name_no, is_ubiquitus };
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ingredient),
  };
  console.log('json: ', requestOptions.body);
  fetch(`${baseUrl}/api/recipes/ingredients`, requestOptions)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

export function createRecipe(recipe: Recipe, image?: Blob){
  let formData = new FormData()
  image && formData.append("hero_image", image)
  formData.append("full_recipe", JSON.stringify(recipe))
  const requestOptions = {
    method: 'POST',
    body: formData
  }
  console.log('json: ', requestOptions.body);
  fetch(`${baseUrl}/api/recipes/recipes`, requestOptions)
    .then((response) => response.json())
    .then((data) => console.log(data));
}
