import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='app-bar bg-surface-100-800-token flex flex-col space-y-4 p-4 shadow-2xl '>
      <div className='flex w-[80vw] flex-row gap-4 align-bottom '>
        <Link href={'/'}>
          <h1 className='mr-20 text-4xl'>Kokeboka</h1>
        </Link>
        <Link href={'/'}>
          <h2 className='text-3xl'>All recipes</h2>
        </Link>
        <Link href={'/recipes/add'}>
          <h2 className='text-3xl'>New recipe</h2>
        </Link>
      </div>
    </nav>
  );
}
