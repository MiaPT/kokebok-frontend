import IngredientDropdown from '@/components/IngredientDropdown';
import { useState } from 'react';

export default function RecipeForm() {
  const [ingredientsInRecipe, setIngredientsInRecipe] = useState<Ingredient[]>(
    []
  );

  console.log('Ingredient in recipe', ingredientsInRecipe);
  function updateIngredientsInRecipe(ingredient: Ingredient) {
    setIngredientsInRecipe([...ingredientsInRecipe, ingredient]);
  }

  return (
    <form className='ml-[25%] mt-20 w-[50%]'>
      <label htmlFor='title' className='block text-white'>
        Title
      </label>
      <input type='text' id='title' />

      <label htmlFor='description' className='block text-white'>
        Description
      </label>
      <textarea id='description' />

      <label htmlFor='time' className='block text-white'>
        Time estimate (minutes)
      </label>
      <input type='number' id='time' />

      <br />
      <br />
      <IngredientDropdown updateIngredients={updateIngredientsInRecipe} />
    </form>
  );
}
