interface RecipeCardProps{
    recipe: RecipeSummary
}

export function RecipeCard({recipe}: RecipeCardProps){
    return <div className="card">
        					<a className="card {currentVariant} card-hover overflow-hidden" href="/elements/cards">
						<header>
							<img src={"/"} className="bg-black/50 w-full aspect-[21/9]" alt="Post" />
						</header>
						<div className="p-4 space-y-4">
							<h6 className="h6" data-toc-ignore>Announcements</h6>
							<h3 className="h3" data-toc-ignore>Skeleton is Awesome!</h3>
							<article>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam aspernatur provident eveniet eligendi cumque consequatur tempore
									sint nisi sapiente. Iste beatae laboriosam iure molestias cum expedita architecto itaque quae rem.
								</p>
							</article>
						</div>
						<hr className="opacity-50" />
						<footer className="p-4 flex justify-start items-center space-x-4">
							<div className="flex-auto flex justify-between items-center">
								<h6 className="font-bold" data-toc-ignore>By Alex</h6>
								<small>On {new Date().toLocaleDateString()}</small>
							</div>
						</footer>
					</a>
    </div>
}