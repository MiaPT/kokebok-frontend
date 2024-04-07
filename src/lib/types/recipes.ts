declare type RecipeSummary = {
  id: number;
  title: string;
  created_at: Date;
  hero_image: string;
  ingredients: Ingredient[];
  preamble: string;
  total_time: number;
};

declare type Recipe = {
  id?: number;
  title: string;
  instructions: string;
  created_at?: Date;
  hero_image?: string;
  ingredients: RecipeIngredient[];
  rest_text?: string;
  language?: string;
  origin_url?: string;
  preamble: string;
  servings?: number;
  total_time: number;
  original_author?: string;
  yields_number?: number;
  yields_type?: string;
  video_url?: string;
  other_source?: string;
};


declare type Ingredient = {
  id: number;
  name_no: string;
  name_en: string;
  is_ubiquitus: boolean;
};

declare type RecipeIngredient = {
  // Id for recipeingredient will be undefined as long as the recipeingredient isn't saved to the db
  id?: number;
  recipe?: string;
  base_ingredient: string;
  name_in_recipe: string;
  is_optional: boolean;
  group_name?: string;
  base_amount: number;
  unit: string;
  base_ingredient_id: number;
};
