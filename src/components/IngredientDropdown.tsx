import { ChangeEvent, useState } from 'react';
import { Combobox } from '@headlessui/react';
import { useIngredients } from '@/lib/api/recipes';
import AddIngredientDialog from './AddIngredientDialog';

interface IngredientDropdownProps {
  addIngredient: (ingredient: Ingredient) => void;
}

export default function IngredientDropdown({
  addIngredient,
}: IngredientDropdownProps) {
  const ingredients = useIngredients();

  const [ingredientInput, setIngredientInput] = useState<string>('');
  const [selectedIngredient, setSelected] = useState<Ingredient | null>(null);
  const [isIngredientFormOpen, setIsIngredientFormOpen] = useState(false);

  const filteredIngredients =
    ingredientInput === ''
      ? ingredients
      : ingredients.filter(
          (i) =>
            i.name_en?.toLowerCase().includes(ingredientInput.toLowerCase()) ||
            i.name_no?.toLowerCase().includes(ingredientInput.toLowerCase())
        );

  console.log('selected ingredient: ', selectedIngredient);

  return (
    <>
      <AddIngredientDialog
        initialValue={ingredientInput}
        isOpen={isIngredientFormOpen}
        setIsOpen={setIsIngredientFormOpen}
        addIngredient={(i: Ingredient) => {addIngredient(i); setIngredientInput("")} }
      />
      <Combobox
        value={selectedIngredient}
        onChange={(i) => {
          setSelected(i);
          i && addIngredient(i);
          setIngredientInput("");
        }}
      >
        <Combobox.Label className={'text-white'}>
          Add ingredient to recipe
        </Combobox.Label>
        <Combobox.Input
          value={ingredientInput}
          onChange={(e) => setIngredientInput(e.target.value)}
        ></Combobox.Input>
        <Combobox.Options>
          {filteredIngredients.length === 0 && ingredientInput != '' ? (
            <button type='button' onClick={() => setIsIngredientFormOpen(true)}>
              Add {ingredientInput}
            </button>
          ) : (
            filteredIngredients.map((i) => (
              <Combobox.Option key={i.id} value={i}>
                <span className='text-black'>{i.name_no}</span>
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </Combobox>
    </>
  );
}
