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

interface IngredientFormProps {
  initialValue: string;
  isOpen?: boolean;
  setIsOpen: (b: boolean) => void;
}

export default function AddIngredientDialog({
  initialValue,
  isOpen,
  setIsOpen,
}: IngredientFormProps) {
  const [newIngredientName, setNewIngredientName] = useState('');
  const [isUbiquitous, setIsUbiquitous] = useState(false);

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
            onClick={() => {
              setIsOpen(false);
              createIngredient(null, newIngredientName, isUbiquitous);
            }}
          >
            Add
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
