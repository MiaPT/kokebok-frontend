import { Button } from '@/components/Button';
import { useIngredients, useRecipes } from '@/lib/api/recipes';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import {RecipeCard} from '@/components/RecipeCard'

export default function Home() {
  const ingredients = useIngredients();

  const recipes = useRecipes();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const queryClient = useQueryClient();

  const onRecipeClick = async (rid: number) => {
    const resp = await queryClient.fetchQuery<Recipe>({
      queryKey: ["recipe-detail", rid],
      queryFn: async () => (await fetch(`http://127.0.0.1:8000/api/recipes/recipe/${rid}`)).json(),
    })
    setRecipe(resp)
  }

  return (
    <main>
      <div className='w-full flex justify-center'>
        <div className='w-[80%]'>

        <Button variant={'secondary'}>Clickety clack</Button>
        <Button variant={'primary'}>Clickety clack</Button>
        <p className='text-lg text-white'>hihi haha abcdefghijklmnop</p>
        <ul>
          {ingredients.map((i) => (
            <li>{i.name_no}</li>
          ))}
        </ul>
        <div className='grid gap-2 grid-cols-5'>

        {recipes.map(r => <RecipeCard recipe={r} />)}
        </div>

        <p>{recipe && recipe.content}</p>
        </div>
      </div>
    </main>
  );
}
