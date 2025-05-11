import { getMealRecipes } from "../utils/mealMethods";
// getMealRecipesFromCache

// Function to check if data is expired (default expiry time: 1 hour)
const isDataExpired = (timestamp, expiryTime = 3600000) => {
    return Date.now() - timestamp > expiryTime;
};

// Function to fetch meal details from the API
const fetchMealDetails = async (idMeal) => {
    try {
        const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
        );
        const data = await res.json();
        const mealDetails = data.meals ? data.meals[0] : null;

        if (mealDetails) {
            // Retrieve existing cached meals from localStorage
            const cachedMeals = JSON.parse(localStorage.getItem("meals")) || {
                data: {},
                timestamp: Date.now(),
            };

            // Update the cached data with the new meal details
            cachedMeals.data[`${idMeal}`] = mealDetails;

            // Store the updated cache in localStorage
            localStorage.setItem(
                "meals",
                JSON.stringify({
                    data: cachedMeals.data,
                    timestamp: Date.now(),
                })
            );
        }

        return mealDetails;
    } catch (error) {
        console.error("Error fetching meal details: ", error);
        return null;
    }
};

// Function to get meal details from cache
export const getMealRecipesFromCache = async (idMeal) => {
    const cachedMeals = JSON.parse(localStorage.getItem("meals")); // Get all cached meals

    if (
        cachedMeals?.data &&
        cachedMeals?.data[`${idMeal}`] &&
        !isDataExpired(cachedMeals.timestamp)
    ) {
        return cachedMeals.data[`${idMeal}`]; // Return cached data for this idMeal
    } else {
        // If data doesn't exist or is expired, fetch from API
        return await fetchMealDetails(idMeal);
    }
};
