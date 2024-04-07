import { truncate } from 'fs';
import { useState, Fragment, useEffect } from 'react';
import { createIngredient } from '@/lib/api/recipes';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn/Dialog';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn/Tooltip';
import { useQueryClient } from '@tanstack/react-query';

interface IngredientFormProps {
  initialValue: string;
  isOpen?: boolean;
  setIsOpen: (b: boolean) => void;
  addIngredient: (i: Ingredient) => void;
}

export default function AddIngredientDialog({
  initialValue,
  isOpen,
  setIsOpen,
  addIngredient
}: IngredientFormProps) {
  const [newIngredientName, setNewIngredientName] = useState('');
  const [isUbiquitous, setIsUbiquitous] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setNewIngredientName(initialValue);
  }, [initialValue]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Register new ingredient</DialogTitle>
        </DialogHeader>
        <div>
            <label htmlFor='ingredientNameNo'>Name for ingredient</label>
            <input
              id='ingredientNameNo'
              className='input py-1 px-4'
              type='text'
              value={newIngredientName}
              onChange={(e) => setNewIngredientName(e.target.value)}
            />
            <TooltipProvider>
              <Tooltip
                delayDuration={300}
              >
                <TooltipTrigger>
                  <label htmlFor='isUbiquitous'>Ubiquitous</label>
                  <input
                    id='isUbiquitous'
                    type='checkbox'
                    className='checkbox'
                    checked={isUbiquitous}
                    onChange={(e) => setIsUbiquitous(e.target.checked)}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Ubiquitous ingredients: basic ingredients like water, salt,
                    sugar etc.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        <DialogFooter>
          <button
            className='btn variant-filled'
            type='submit'
            onClick={async () => {
              setIsOpen(false);
              const newIngredient = await createIngredient(null, newIngredientName, isUbiquitous, queryClient);
              addIngredient(newIngredient);
            }}
          >
            Add
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
