import { useQuery } from "@tanstack/react-query"

export function useIngredients() {
    const {data: ingredients} = useQuery<Ingredient[]>({
      queryKey: ["ingredients-list"],
      queryFn: () => fetch("http://127.0.0.1:8000/api/recipes/ingredients").then(r => r.json()),
      initialData: []
    })
  
    return ingredients
  }
  