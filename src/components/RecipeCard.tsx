import Link from 'next/link';
import placeholderImage from '@/../public/animemat.jpg';
import Image from 'next/image';
interface RecipeCardProps {
  recipe: RecipeSummary;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.id}`}>
      <div className='bg-initial card card-hover overflow-hidden'>
        <header>
          <Image src={placeholderImage} alt='animemat:)' />
        </header>
        <div className='space-y-4 p-4'>
          <h3 className='h3' data-toc-ignore>
            {recipe.title}
          </h3>
          <article>
            <p>{recipe.preamble}</p>
          </article>
        </div>
        <hr className='opacity-50' />
        <footer className='flex items-center justify-start space-x-4 p-4'>
          <div className='flex flex-auto items-center justify-between'>
            <h6 className='font-bold' data-toc-ignore>
              Tid: ~{recipe.total_time} minutter
            </h6>
            <small>On {new Date(recipe.created_at).toLocaleDateString()}</small>
          </div>
        </footer>
      </div>
    </Link>
  );
}
