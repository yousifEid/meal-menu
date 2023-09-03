function toggleSideNav(target) {
  var sideNavMenu = $(".side-nav-menu");
  var navTab = $(".nav-tab");

  if (sideNavMenu.css("left") === "-256.562px") {
    sideNavMenu.css("left", "0");
    navTab.css("left", "0");

    if (target === "searchInputs") {
      showSearchInputs();
    }
  } else {
    sideNavMenu.css("left", "-256.562px");
    navTab.css("left", "-256.562px");
  }
}

$(document).ready(function () {
  $.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/search.php?s",
    method: "GET",
    success: function (response) {
      var meals = response.meals;
      var rowData = $("#rowData");

      meals.forEach(function (meal) {
        var mealDiv = $("<div>", {
          class: "col-md-3",
        });

        var mealDetails = $("<div>", {
          class:
            "meal position-relative overflow-hidden rounded-2 cursor-pointer",
          onclick: "getMealDetails('" + meal.idMeal + "')",
        });

        var mealImage = $("<img>", {
          class: "w-100",
          src: meal.strMealThumb,
          alt: meal.strMeal,
        });

        var mealLayer = $("<div>", {
          class:
            "meal-layer position-absolute d-flex align-items-center text-black p-2",
        }).append($("<h3>").text(meal.strMeal));

        mealDetails.append(mealImage);
        mealDetails.append(mealLayer);
        mealDiv.append(mealDetails);

        rowData.append(mealDiv);
      });
    },
  });
});



async function getMealDetails(mealId) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const data = await response.json();
    const meal = data.meals[0];


    document.getElementById("rowData").style.display = "none";
    document.getElementById("detailsMeal").style.display = "block";
    

    document.getElementById("mealImage").src = meal.strMealThumb;
    document.getElementById("mealName").textContent = meal.strMeal;

    document.getElementById("detailsMeal").style.display = "block";

    document.getElementById("instructions").textContent = meal.strInstructions;
    document.getElementById("area").textContent = meal.strArea;
    document.getElementById("category").textContent = meal.strCategory;

    const ingredientsList = document.getElementById("ingredients");
    ingredientsList.innerHTML = "";
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal["strIngredient" + i];
      if (ingredient) {
        const listItem = document.createElement("li");
        listItem.className = "alert alert-info m-2 p-1";
        listItem.textContent = ingredient;
        ingredientsList.appendChild(listItem);
      }
    }

    const tagsList = document.getElementById("tags");
    tagsList.innerHTML = "";
    const tags = meal.strTags ? meal.strTags.split(",") : [];
    tags.forEach((tag) => {
      const listItem = document.createElement("li");
      listItem.className = "alert alert-danger m-2 p-1";
      listItem.textContent = tag.trim();
      tagsList.appendChild(listItem);
    });

    document.getElementById("sourceLink").href = meal.strSource;
    document.getElementById("youtubeLink").href = meal.strYoutube;
  } catch (error) {
    console.error("Error:", error);
  }
}


function showSearchInputs() {
  const searchInputs = document.getElementById("searchInputs");
  const rowData = document.getElementById("rowData");
  if (searchInputs.style.display === "none") {
    searchInputs.style.display = "block";
    rowData.style.display = "none";
  } else {
    searchInputs.style.display = "none";
    rowData.style.display = "block";
  }
}
