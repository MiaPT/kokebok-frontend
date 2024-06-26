import IngredientDropdown from '@/components/IngredientDropdown';
import { Input } from '@/components/shadcn/Input';
import { createRecipe } from '@/lib/api/recipes';
import { useState } from 'react';

export default function RecipeForm() {
  const [recipeIngredients, setRecipeIngredients] = useState<
    RecipeIngredient[]
  >([]);
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [recipeInstructions, setRecipeInstructions] = useState('');
  const [timeEstimate, setTimeEstimate] = useState(0);

  const newRecipe: Recipe = {
    instructions: recipeInstructions,
    preamble: recipeDescription,
    ingredients: recipeIngredients,
    total_time: timeEstimate,
    title: recipeTitle,
  };

  function addRecipeIngredient(ingredient: Ingredient) {
    const newIngredient = {
      base_ingredient_id: ingredient.id,
      base_ingredient: ingredient.name_no,
      name_in_recipe: ingredient.name_no,
      base_amount: 1,
      is_optional: false,
      unit: 'g',
    };

    setRecipeIngredients([...recipeIngredients, newIngredient]);
  }

  const units = [
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
    '',
  ];

  const handleIngredientChange = (index: number, event) => {
    let data = [...recipeIngredients];
    data[index][event.target.name] = event.target.value;
    setRecipeIngredients(data);
  };

  return (
    <form
      className='ml-[25%] mt-20 w-[50%]'
      onSubmit={() => createRecipe(newRecipe)}
    >
      <label htmlFor='title' className='block '>
        Title
      </label>
      <Input
        type='text'
        id='title'
        // className='input py-2 px-6'
        value={recipeTitle}
        onChange={(e) => setRecipeTitle(e.target.value)}
      />

      <label htmlFor='description' className='block '>
        Description
      </label>
      <textarea
        id='description'
        className='textarea variant-form-material p-2'
        value={recipeDescription}
        onChange={(e) => setRecipeDescription(e.target.value)}
      />

      <label htmlFor='instructions' className='block '>
        Instructions
      </label>
      <textarea
        id='instructions'
        className='textarea variant-form-material p-2'
        rows={10}
        value={recipeInstructions}
        onChange={(e) => setRecipeInstructions(e.target.value)}
      />

      <label htmlFor='time' className='block '>
        Time estimate (minutes)
      </label>
      <Input
        type='number'
        id='time'
        className='w-36'
        value={timeEstimate}
        onChange={(e) => setTimeEstimate(parseInt(e.target.value))}
      />

      <br />
      <br />
      <IngredientDropdown addIngredient={addRecipeIngredient} />
      <br />
      <br />
      <br />
      <br />
      <br />
      {recipeIngredients.map((ing, index) => (
        <div className=' border' key={index}>
          Base ingredient: {ing.base_ingredient}
          <label htmlFor='name_in_recipe'>Name in recipe</label>
          <Input
            type='text'
            name='name_in_recipe'
            value={ing.name_in_recipe}
            onChange={(e) => handleIngredientChange(index, e)}
          />
          <label htmlFor='base_amount'>Amount</label>
          <Input
            type='number'
            name='base_amount'
            value={ing.base_amount}
            onChange={(e) => handleIngredientChange(index, e)}
          />
          <select
            name='unit'
            onChange={(e) => handleIngredientChange(index, e)}
          >
            {units.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
          <button
            type='button'
            onClick={() =>
              setRecipeIngredients(recipeIngredients.toSpliced(index, 1))
            }
          >
            ❌
          </button>
        </div>
      ))}
      <button className='variant-filled-primary btn' type='submit'>
        Submit
      </button>
    </form>
  );
}
