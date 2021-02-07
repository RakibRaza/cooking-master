// API
const API = "https://www.themealdb.com/api/json/v1/1/";

// Select items
const mealsContainer = document.getElementById("meals");
const mealDetailsContainer = document.getElementById("meal-details");
const preloader = document.getElementById("preloader");
const notFoundDiv = document.getElementById("not-found");

// Get Meals By Search Keyword
const getMeals = async (keyword) => {
  const res = await fetch(`${API}search.php?s=${keyword}`);
  const data = await res.json();
  const meals = data.meals;

  preloader.style.display = "none";

  if (meals) {
    displayMeals(meals);
  } else {
    notFoundDiv.style.display = "block";
  }
};

// Get Meal By Id
const getMealById = async (id) => {
  const res = await fetch(`${API}lookup.php?i=${id}`);
  const data = await res.json();
  const meal = data.meals[0];

  showMealDetails(meal);
};

// Handle Click Event
document.getElementById("search-btn").addEventListener("click", (e) => {
  e.preventDefault();

  const searchInput = document.getElementById("search-meal");
  const keyword = searchInput.value;

  if (keyword) {
    showPreloader();
    getMeals(keyword);
  }

  searchInput.value = "";
});

// Display meals
const displayMeals = (meals) => {
  const html = meals.map((meal) => {
    const { strMeal, strMealThumb, idMeal } = meal;

    return `
    <div class="col-md-3">
      <article onclick="getMealById(${idMeal})" class="card">
        <img src="${strMealThumb}" class="card-img-top" alt="${strMeal}" />
        <div class="card-body">
          <h5 class="card-title">${strMeal}</h5>
        </div>
      </article>
    </div>`;
  });

  mealsContainer.innerHTML = html.join("");
};

// Show Meal Details
const showMealDetails = (meal) => {
  const { strMealThumb, strMeal } = meal;

  const ingredients = [];
  // Get Ingredients And Measures
  for (let i = 1; i <= 20; i++) {
    if (meal["strIngredient" + i]) {
      ingredients.push(
        `${meal["strIngredient" + i]} - ${meal["strMeasure" + i]}`
      );
    }
  }

  const html = `
     <div class="col-md-6">
      <article class="card">
        <img src="${strMealThumb}" class="card-img-top" alt="${strMeal}" />
        <div class="card-body">
         <h4 class="fw-bold mb-4 ms-4">${strMeal}</h4>
         <h5 class="fw-bold mb-4 ms-4">Ingredients</h5>
         <ul>${ingredients.map((ing) => `<li>${ing}</li>`).join("")}</ul>
        </div>
      </article>
     </div>`;

  mealDetailsContainer.innerHTML = html;
};

// Show Preloader
const showPreloader = () => {
  preloader.style.display = "block";
  // Clean Container
  mealsContainer.innerHTML = "";
  mealDetailsContainer.innerHTML = "";
  notFoundDiv.style.display = "none";
};
