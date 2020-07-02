const randomBtn = document.getElementById('random');
const single_Meal = document.getElementById('single-meal');



//fetch a random meal
function RandomMealF () {
	fetch('https://www.themealdb.com/api/json/v1/1/random.php')
	.then(res => res.json())
	.then(data => {
		const meal = data.meals[0];
		addMealToDOM(meal);
	});
}

//Add meal to the dom
function addMealToDOM(meal) {
	const ingredients = [];

	for(let i=1 ; i <=20 ; i++) {
		if(meal[`strIngredient${i}`]) {
			ingredients.push(`${meal[`strIngredient${i}`]} : ${meal[`strMeasure${i}`]}`)
		} else {
			break;
		}
	}

	single_Meal.innerHTML = `
		<div class="single-meal" > 
		<h2>${meal.strMeal}</h2>
		<img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
		<div class ="single-meal-info">
			${meal.strCategory ?  `<p> <strong>Category : </strong> ${meal.strCategory}</p>` : ''}
			${meal.strArea ? `<p> <strong> Area :</strong> ${meal.strArea}</p>` : ''}
		</div>

		<div class= "main" >
			<div class ="box">
		<p>${meal.strInstructions}</p>
			</div>
		<h3>Ingredients :</h3>
		  <ul> 
			${ingredients.map(ing => `<li>${ing}</li>`).join('')}
		  </ul>
		${meal.strYoutube ? `
		<div class = "single-meal" >
			<h3> Video Recipe :</h3>
				<div class ="videoWrapper" >
					<iframe width ="420" height ="315" 
					 src=" https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
					</iframe>
				</div>
			</div>` : ''}
		`;
}
	











//Add Event Listener 
randomBtn.addEventListener('click', RandomMealF);