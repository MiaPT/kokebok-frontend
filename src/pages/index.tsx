import { useIngredients, useRecipes } from '@/lib/api/recipes';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { RecipeCard } from '@/components/RecipeCard';

export default function Home() {
  const ingredients = useIngredients();

  const recipes = useRecipes();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const queryClient = useQueryClient();

  const onRecipeClick = async (rid: number) => {
    const resp = await queryClient.fetchQuery<Recipe>({
      queryKey: ['recipe-detail', rid],
      queryFn: async () =>
        (await fetch(`http://127.0.0.1:8000/api/recipes/recipe/${rid}`)).json(),
    });
    setRecipe(resp);
  };

  return (
    <main className='ml-auto mr-auto mt-14 md:w-[70vw] sm:w-[85vw]'>
      <div className='flex w-full justify-center '>
        <div className='grid grid-cols-3 gap-6'>
          {recipes.map((r) => (
            <RecipeCard recipe={r} key={r.id} />
          ))}
        </div>

        <p>{recipe && recipe.preamble}</p>
      </div>
    </main>
  );
}
