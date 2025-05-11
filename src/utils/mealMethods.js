import axios from "axios";

const fetchWithRetry = async (fn, retries = 3, delay = 500) => {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i < retries - 1) {
                console.log(`Retrying... attempt ${i + 2}`);
                await new Promise((res) => setTimeout(res, delay));
            } else {
                throw error;
            }
        }
    }
};

export const getCategories = async () => {
    return await fetchWithRetry(() =>
        axios.get("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
    )
        .then((res) => res.data)
        .catch((error) => {
            if (error.response) {
                // Handle rate limiting
                if (error.response.status === 429) {
                    alert("Rate limit exceeded. Please try again later.");
                }
                console.error(
                    "Server responded with status:",
                    error.response.status
                );
            } else if (error.request) {
                console.error("No response received (area):", error.request);
            } else {
                console.error("Axios error:", error.message);
            }
            return { meals: [] }; // fallback to empty array
        });
};

export const getAreas = async () => {
    return await fetchWithRetry(() =>
        axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    )
        .then((res) => res.data)
        .catch((error) => {
            if (error.response) {
                // Handle rate limiting
                if (error.response.status === 429) {
                    alert("Rate limit exceeded. Please try again later.");
                }
                console.error(
                    "Server responded with status:",
                    error.response.status
                );
            } else if (error.request) {
                console.error("No response received (area):", error.request);
            } else {
                console.error("Axios error:", error.message);
            }
            return { meals: [] }; // fallback to empty array
        });
};

export const getIngredients = async () => {
    return await fetchWithRetry(() =>
        axios.get("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    )
        .then((res) => res.data)
        .catch((error) => {
            if (error.response) {
                // Handle rate limiting
                if (error.response.status === 429) {
                    alert("Rate limit exceeded. Please try again later.");
                }
                console.error(
                    "Server responded with status:",
                    error.response.status
                );
            } else if (error.request) {
                console.error("No response received (area):", error.request);
            } else {
                console.error("Axios error:", error.message);
            }
            return { meals: [] }; // fallback to empty array
        });
};

export const getMealByCategory = async (category) => {
    return await axios
        .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((res) => res.data)
        .catch((error) => {
            if (error.response) {
                // Handle rate limiting
                if (error.response.status === 429) {
                    alert("Rate limit exceeded. Please try again later.");
                }
                console.error(
                    "Server responded with status:",
                    error.response.status
                );
            } else if (error.request) {
                console.error("No response received (area):", error.request);
            } else {
                console.error("Axios error:", error.message);
            }
            return { meals: [] }; // fallback to empty array
        });
};

export const getMealByArea = async (area) => {
    return await fetchWithRetry(() =>
        axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
        )
    )
        .then((res) => res.data)
        .catch((err) => console.error(err));
};

export const getMealByName = async (name) => {
    if (isNaN(name)) {
        return await fetchWithRetry(() =>
            axios.get(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
            )
        )
            .then((res) => res.data)
            .catch((err) => console.error(err));
    } else {
        return await axios
            .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`)
            .then((res) => res.data)
            .catch((err) => console.error(err));
    }
};

export const getMealRecipes = async (id) => {
    return await fetchWithRetry(() =>
        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    )
        .then((res) => res.data.meals)
        .catch((error) => {
            if (error.response) {
                // Handle rate limiting
                if (error.response.status === 429) {
                    alert("Rate limit exceeded. Please try again later.");
                }
                console.error(
                    "Server responded with status:",
                    error.response.status
                );
            } else if (error.request) {
                console.error("No response received (area):", error.request);
            } else {
                console.error("Axios error:", error.message);
            }
            return { meals: [] }; // fallback to empty array
        });
};

// export const getAllMealRecipes = async () => {
//     return await axios
//         .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
//         .then((res) => res.data.meals)
//         .catch((err) => console.error(err));
// };
