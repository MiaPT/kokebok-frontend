import { Button } from '@/components/Button';
import { useIngredients } from '@/lib/api/recipes';

export default function Home() {
  const ingredients = useIngredients();

  return (
    <main>
      <div>
        <Button variant={'secondary'}>Clickety clack</Button>
        <Button variant={'primary'}>Clickety clack</Button>
        <p className='text-lg text-white'>hihi haha abcdefghijklmnop</p>
        <ul>
          {ingredients.map((i) => (
            <li>{i.name_no}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
