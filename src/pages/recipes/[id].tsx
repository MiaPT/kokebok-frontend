import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRecipe } from '@/lib/api/recipes';

export default function RecipeDetails() {
  const {
    query: { id },
  } = useRouter();
  const { query } = useRouter();
  const recipeId = parseInt(query.id as string);

  const recipe = useRecipe(recipeId);
  if (!recipe){
    return null
  }
  return (
    <>
      <Head>
        <title>{recipe.title}</title>
      </Head>
      <div>
        <h2 className='text-4xl'>{recipe.title}</h2>
        {recipe.preamble}
        {recipe.instructions}
        {recipe.rest_text}
        <ul>
          {recipe.ingredients.map(i => (
            <li>{i.name_in_recipe} {i.base_amount} {i.unit}</li>
          ))}
        </ul>

      </div>
    </>
  );
}
