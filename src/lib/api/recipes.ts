import { useQuery } from '@tanstack/react-query';

export function useIngredients() {
  const { data: ingredients } = useQuery<Ingredient[]>({
    queryKey: ['ingredients-list'],
    queryFn: () =>
      fetch('http://127.0.0.1:8000/api/recipes/ingredients').then((r) =>
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
      fetch('http://127.0.0.1:8000/api/recipes/recipes').then((r) => r.json()),
    initialData: [],
  });

  return recipes;
}

export function useRecipe(id: number) {
  const { data: recipe } = useQuery<Recipe[] | null>({
    queryKey: ['recipe-detail', id],
    queryFn: () =>
      fetch(`http://127.0.0.1:8000/api/recipes/recipes/${id}`).then((r) => r.json()),
    initialData: null,
  });

  return recipe;
}
