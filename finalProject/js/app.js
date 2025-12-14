let selectedMeal = null;
let customMeals = JSON.parse(localStorage.getItem("customMeals")) || [];

let mealPlan = JSON.parse(localStorage.getItem("mealPlan")) || {
    Monday: { breakfast: null, lunch: null, dinner: null },
    Tuesday: { breakfast: null, lunch: null, dinner: null },
    Wednesday: { breakfast: null, lunch: null, dinner: null },
    Thursday: { breakfast: null, lunch: null, dinner: null },
    Friday: { breakfast: null, lunch: null, dinner: null },
    Saturday: { breakfast: null, lunch: null, dinner: null },
    Sunday: { breakfast: null, lunch: null, dinner: null }
};

function renderPlan() {
    let html = `
        <div class="gridHeader">Day</div>
        <div class="gridHeader">Breakfast</div>
        <div class="gridHeader">Lunch</div>
        <div class="gridHeader">Dinner</div>
    `;
    
    for (let day in mealPlan) {
        html += `<div class="gridCell gridDay">${day}</div>`;
        
        ["breakfast","lunch","dinner"].forEach(mealType => {
            let meal = mealPlan[day][mealType];
            html += `
                <div class="gridCell mealSlot" data-day="${day}" data-type="${mealType}">
                    ${
                        meal ?
                        `<div class="viewMeal" data-day="${day}" data-type="${mealType}">
                            <img src="${meal.thumb}" style="width:60px;height:60px;object-fit:cover;border-radius:4px;">
                            <div style="font-size:12px;margin-top:5px;">${meal.name}</div>
                        </div>
                        <button class="deleteBtn" style="margin-top:5px;">Remove</button>`
                        :
                        `<span style="color:gray;">(empty)</span>`
                    }
                </div>`;
        });
    }
    
    $("#planGrid").html(html);
}
renderPlan();

//search meals

//auto fill week with premade items from json
// Auto-fill button click handler
$("#autoFillBtn").click(() => {
    // Call the function from sampleMeals.js to get the array
    const sampleMeals = getSampleMeals();
    
    const days = Object.keys(mealPlan);
    const mealTypes = ['breakfast', 'lunch', 'dinner'];
    
    // Filter meals by type
    const breakfasts = sampleMeals.filter(m => m.category === 'Breakfast');
    const lunches = sampleMeals.filter(m => m.category === 'Lunch');
    const dinners = sampleMeals.filter(m => m.category === 'Dinner');
    
    //populate each day
    days.forEach((day, dayIndex) => {
        mealPlan[day].breakfast = breakfasts[dayIndex % breakfasts.length] || null;
        mealPlan[day].lunch = lunches[dayIndex % lunches.length] || null;
        mealPlan[day].dinner = dinners[dayIndex % dinners.length] || null;
    });
    
    localStorage.setItem("mealPlan", JSON.stringify(mealPlan));
    renderPlan();
    alert("Week auto-filled with sample meals!");
});


// Populate categories dropdown for extra search
$.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list', data => {
    $('#searchSection').append(`<br>
        <label>Category:</label>
        <select id="categorySelect">
            <option value="">--Select Category--</option>
            ${data.meals.map(cat => `<option value="${cat.strCategory}">${cat.strCategory}</option>`).join('')}
        </select>
        <button id="searchCategoryBtn">Search by Category</button>
    `);
});

// Search by name
$("#searchBtn").click(() => {
    let query = $("#searchInput").val().trim();
    if(!query) return;
    searchByName(query);
});

// Search by category
$(document).on('click','#searchCategoryBtn', () => {
    let category = $('#categorySelect').val();
    if(!category) return;
    searchByCategory(category);
});

// create custom meal
function displayCustomMeals() {
    if (customMeals.length === 0) {
        $("#customMeals").html("");
        return;
    }
    
    let html = "<h3>Your Custom Meals:</h3>";
    customMeals.forEach((meal, index) => {
        html += `
            <div class="mealCard" data-custom-index="${index}">
                ${meal.thumb ? `<img src="${meal.thumb}" style="width:100px; height:100px; object-fit:cover; border-radius:4px;">` : `<div style="width:100px; height:100px; background:#ddd; border-radius:4px;"></div>`}
                <p>${meal.name}</p>
            </div>
        `;
    });
    $("#customMeals").html(html);
}

displayCustomMeals();

$("#createMealBtn").click(() => {
    let name = $("#customMealName").val().trim();
    let image = $("#customMealImage").val().trim();
    let category = $("#customMealCategory").val().trim();
    let ingredientsText = $("#customMealIngredients").val().trim();
    let instructions = $("#customMealInstructions").val().trim();
    
    if (!name || !ingredientsText || !instructions) {
        alert("Please fill in Meal Name, Ingredients, and Instructions");
        return;
    }
    
    let ingredients = ingredientsText.split(",").map(ing => ing.trim());
    
    let newMeal = {
        id: "custom_" + Date.now(),
        name: name,
        thumb: image || "https://via.placeholder.com/100?text=No+Image",
        category: category || "Custom",
        area: "User Created",
        instructions: instructions,
        ingredients: ingredients
    };
    
    customMeals.push(newMeal);
    localStorage.setItem("customMeals", JSON.stringify(customMeals));
    
    // Clear form
    $("#customMealName").val("");
    $("#customMealImage").val("");
    $("#customMealCategory").val("");
    $("#customMealIngredients").val("");
    $("#customMealInstructions").val("");
    
    displayCustomMeals();
});

function searchByName(query){
    $.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`, data => {
        displayMeals(data.meals);
    });
}

function searchByCategory(cat){
    $.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`, data => {
        displayMeals(data.meals);
    });
}

//display meals
function displayMeals(meals){
    if(!meals){ $('#searchResults').html('<p>No meals found.</p>'); return;}
    let html = meals.map(m => `
        <div class="mealCard" data-id="${m.idMeal}">
            <img src="${m.strMealThumb}" />
            <p>${m.strMeal}</p>
        </div>
    `).join('');
    $('#searchResults').html(html);
}

//show meal details
$(document).on("click", ".mealCard", function () {
    let customIndex = $(this).data("customIndex");
    let id = $(this).data("id");
    
    if (customIndex !== undefined) {
        // Custom meal clicked
        selectedMeal = customMeals[customIndex];
        showMealModal();
    } else {
        $.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, data => {
            let m = data.meals[0];

            let ingredients = [];
            for(let i=1; i<=20; i++){
                let ing = m[`strIngredient${i}`];
                let measure = m[`strMeasure${i}`];
                if(ing && ing.trim()!=="") ingredients.push(`${ing} - ${measure}`);
            }

            selectedMeal = {
                id: m.idMeal,
                name: m.strMeal,
                thumb: m.strMealThumb,
                category: m.strCategory,
                area: m.strArea,
                instructions: m.strInstructions,
                ingredients: ingredients
            };

            showMealModal();
        });
    }
});

function showMealModal() {
    // Display selected meal details in modal
    $("#selectedMealDisplay").html(`
        <div style="text-align:center; margin-bottom:15px;">
            <img src="${selectedMeal.thumb}" style="width:200px; border-radius:8px;" />
            <h4>${selectedMeal.name}</h4>
            <p>Category: ${selectedMeal.category} | Area: ${selectedMeal.area}</p>
            <details>
                <summary>View Ingredients</summary>
                <ul style="text-align:left; margin:10px auto; max-width:300px;">
                    ${selectedMeal.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </details>
            <details>
                <summary>View Instructions</summary>
                <p style="text-align:left; margin:10px; max-height:150px; overflow-y:auto;">${selectedMeal.instructions}</p>
            </details>
        </div>
    `);

    $("#slotModal").show();
}

// save meal
$("#saveMealBtn").click(() => {
    let day = $("#daySelect").val();
    let type = $("#mealTypeSelect").val();
    let notes = $("#mealNotes").val();

    selectedMeal.notes = notes;

    mealPlan[day][type] = selectedMeal;
    localStorage.setItem("mealPlan", JSON.stringify(mealPlan));

    renderPlan();
    $("#slotModal").hide();
    $("#mealNotes").val(""); // clear notes for next selection
});

$("#closeModalBtn").click(() => $("#slotModal").hide());

// delete meal
$(document).on("click", ".deleteBtn", function (e) {
    e.stopPropagation();
    let cell = $(this).closest(".mealSlot");
    let day = cell.data("day");
    let type = cell.data("type");

    mealPlan[day][type] = null;
    localStorage.setItem("mealPlan", JSON.stringify(mealPlan));
    renderPlan();
});

// view meal details
$(document).on("click", ".viewMeal", function (e) {
    let day = $(this).data("day");
    let type = $(this).data("type");
    let meal = mealPlan[day][type];
    
    if (!meal) return;
    
    // Display meal details in modal
    $("#selectedMealDisplay").html(`
        <div style="text-align:center; margin-bottom:15px;">
            <img src="${meal.thumb}" style="width:200px; border-radius:8px;" />
            <h4>${meal.name}</h4>
            <p>Category: ${meal.category} | Area: ${meal.area}</p>
            ${meal.notes ? `<p>Notes: ${meal.notes}</p>` : ''}
            <details>
                <summary>View Ingredients</summary>
                <ul style="text-align:left; margin:10px auto; max-width:300px;">
                    ${meal.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </details>
            <details>
                <summary>View Instructions</summary>
                <p style="text-align:left; margin:10px; max-height:150px; overflow-y:auto;">${meal.instructions}</p>
            </details>
        </div>
    `);
    
    // hide the save/day/type selectors since we're just viewing
    $("#daySelect, #mealTypeSelect, #mealNotes, #saveMealBtn").hide();
    $("#slotModal").show();
});

$("#closeModalBtn").click(() => {
    $("#slotModal").hide();
    // Show save controls again for next time
    $("#daySelect, #mealTypeSelect, #mealNotes, #saveMealBtn").show();
});
