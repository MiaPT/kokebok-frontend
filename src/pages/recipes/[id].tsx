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

  return (
    <div>
      <Head>
        <title>{recipe?.title}</title>
      </Head>
      hello, you are looking at the recipe with id {JSON.stringify(recipe)}
    </div>
  );
}
