// Sample meals array stored in separate file
const sampleMealsData = [
    {
        "id": "sample_breakfast_1",
        "name": "Pancakes with Syrup",
        "thumb": "https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg",
        "category": "Breakfast",
        "area": "American",
        "instructions": "Mix flour, eggs, milk, and baking powder. Pour batter onto hot griddle. Cook until bubbles form, then flip. Serve with butter and maple syrup.",
        "ingredients": ["2 cups flour", "2 eggs", "1.5 cups milk", "2 tsp baking powder", "Butter", "Maple syrup"]
    },
    {
        "id": "sample_lunch_1",
        "name": "Grilled Chicken Salad",
        "thumb": "https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg",
        "category": "Lunch",
        "area": "American",
        "instructions": "Grill seasoned chicken breast. Chop lettuce, tomatoes, cucumbers. Toss vegetables with grilled chicken and your favorite dressing.",
        "ingredients": ["2 chicken breasts", "4 cups lettuce", "2 tomatoes", "1 cucumber", "Olive oil", "Salt and pepper", "Salad dressing"]
    },
    {
        "id": "sample_dinner_1",
        "name": "Spaghetti Bolognese",
        "thumb": "https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg",
        "category": "Dinner",
        "area": "Italian",
        "instructions": "Brown ground beef with onions and garlic. Add tomato sauce and herbs. Simmer for 20 minutes. Cook spaghetti and serve with sauce.",
        "ingredients": ["1 lb ground beef", "1 onion", "3 cloves garlic", "2 cans tomato sauce", "Italian herbs", "1 lb spaghetti", "Parmesan cheese"]
    },
    {
        "id": "sample_breakfast_2",
        "name": "Scrambled Eggs & Toast",
        "thumb": "https://www.themealdb.com/images/media/meals/1550440197.jpg",
        "category": "Breakfast",
        "area": "American",
        "instructions": "Whisk eggs with milk, salt, and pepper. Scramble in buttered pan. Toast bread and serve with eggs.",
        "ingredients": ["4 eggs", "2 tbsp milk", "Butter", "4 slices bread", "Salt and pepper"]
    },
    {
        "id": "sample_lunch_2",
        "name": "Turkey Sandwich",
        "thumb": "https://www.themealdb.com/images/media/meals/1529444830.jpg",
        "category": "Lunch",
        "area": "American",
        "instructions": "Layer sliced turkey, lettuce, tomato, and cheese on bread. Add mayo or mustard. Cut in half and serve.",
        "ingredients": ["8 slices bread", "1/2 lb turkey", "Lettuce", "2 tomatoes", "Cheese slices", "Mayo", "Mustard"]
    },
    {
        "id": "sample_dinner_2",
        "name": "Baked Salmon with Vegetables",
        "thumb": "https://www.themealdb.com/images/media/meals/1548772327.jpg",
        "category": "Dinner",
        "area": "Healthy",
        "instructions": "Season salmon with lemon, salt, and herbs. Bake at 400°F for 15 minutes with vegetables. Serve hot.",
        "ingredients": ["2 salmon fillets", "1 lemon", "Mixed vegetables", "Olive oil", "Herbs", "Salt and pepper"]
    },
    {
        "id": "sample_breakfast_3",
        "name": "Oatmeal with Berries",
        "thumb": "https://www.themealdb.com/images/media/meals/1550441275.jpg",
        "category": "Breakfast",
        "area": "Healthy",
        "instructions": "Cook oats in milk or water. Top with fresh berries, honey, and nuts.",
        "ingredients": ["1 cup oats", "2 cups milk", "Mixed berries", "Honey", "Nuts"]
    }
];

// Function to return the array of sample meals
function getSampleMeals() {
    return sampleMealsData;
}
