import IngredientDropdown from '@/components/IngredientDropdown';
import { useState } from 'react';

export default function RecipeForm() {

  const [recipeIngredients, setRecipeIngredients] = useState<RecipeIngredient[]>([])

  console.log(recipeIngredients)

  function addRecipeIngredient(ingredient: Ingredient) {
    const newIngredient = {
      base_ingredient_id: ingredient.id, 
      base_ingredient: ingredient.name_no,
      name_in_recipe: ingredient.name_no,
      base_amount: 1, 
      is_optional: false,
      group_name: "",
      unit: "g",
    }

    setRecipeIngredients([...recipeIngredients, newIngredient])
  }


  const units = [
    "g",
    "kg",
    "oz",
    "lb",
    "l",
    "dl",
    "cl",
    "ml",
    "cup",
    "tbsp",
    "tsp",
    "count",
    "slice",
    "cm",
    "inch",
    ""
  ]

  const handleIngredientChange = (index: number, event) => {
    let data = [...recipeIngredients]
    data[index][event.target.name] = event.target.value
    setRecipeIngredients(data)
  }
  


  return (
    <form className='ml-[25%] mt-20 w-[50%]'>
      <label htmlFor='title' className='block '>
        Title
      </label>
      <input type='text' id='title' />

      <label htmlFor='description' className='block '>
        Description
      </label>
      <textarea id='description' />

      <label htmlFor='time' className='block '>
        Time estimate (minutes)
      </label>
      <input type='number' id='time' />

      <br />
      <br />
      <IngredientDropdown updateIngredients={addRecipeIngredient} />
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      {recipeIngredients.map((ing, index) => ( 
        <div className=" border">
          Base ingredient: {ing.base_ingredient}
          <label htmlFor="name_in_recipe">Name in recipe</label>
          <input type="text" name="name_in_recipe" value={ing.name_in_recipe} onChange={(e) => handleIngredientChange(index, e)}/>
          <label htmlFor="base_amount">Amount</label>
          <input type="number" name="base_amount" value={ing.base_amount} onChange={(e) => handleIngredientChange(index, e)}/>
          <select name="unit" onChange={(e) => handleIngredientChange(index, e)}>
                {units.map((u) => (
                    <option value={u}>{u}</option>
                ))}
            </select>
        </div>
      ))}
    </form>
  );
}
