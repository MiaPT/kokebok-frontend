import Link from "next/link";

export default function () {
  return (
    <nav className='pb-8 pt-4 font-bold bg-primary-300 flex justify-center'>
      <div className="flex flex-row gap-4 w-[80vw] align-bottom ">
      <Link href={"/"}><h1 className="text-4xl mr-20">Kokeboka</h1></Link>
      <Link href={"/"}><h2 className="text-3xl">All recipes</h2></Link>
      <Link href={"/recipes/add"}><h2 className="text-3xl">New recipe</h2></Link>
      </div>
    </nav>
  );
}
