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
    <Dialog open={isOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Register new ingredient</DialogTitle>
          <DialogDescription>
            <label htmlFor='ingredientNameNo'>Name for ingredient</label>
            <input
              id='ingredientNameNo'
              className='input'
              type='text'
              value={newIngredientName}
              onChange={(e) => setNewIngredientName(e.target.value)}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <label htmlFor='isUbiquitous'>Ubiquitous</label>
                  <input
                    id='isUbiquitous'
                    type='checkbox'
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
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'></div>
          <div className='grid grid-cols-4 items-center gap-4'></div>
        </div>
        <DialogFooter>
          <button
            type='submit'
            onClick={() => {
              setIsOpen(false);
              createIngredient(null, newIngredientName, isUbiquitous);
            }}
          >
            Save changes
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
