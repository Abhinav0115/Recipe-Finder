import React, { useState, useEffect } from "react";
import { getMealRecipes } from "../utils/mealMethods";
import { getMealRecipesFromCache } from "../utils/cache";
import Recipe from "./Recipe";

const Card = ({ item }) => {
    const [recipe, setRecipe] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    // useEffect(() => {
    //     getMealRecipes(item.idMeal)
    //         .then((res) => {
    //             if (res && res.length > 0) {
    //                 setDetails(res[0]);
    //             }
    //         })
    //         .catch((err) => console.error(err));
    // }, [item.idMeal]);

    // const getRecipe = async (id) => {
    //     await getMealRecipes(id)
    //         .then((res) => setRecipe(res))
    //         .catch((err) => console.error(err));
    // };

    // const handleClick = async (id) => {
    //     await getMealRecipes(id)
    //         .then((res) => setRecipe(res))
    //         .catch((err) => console.error(err));
    //     setOpenModal(true);
    // };

    const handleClick = async (id) => {
        // Get recipe from cache or API
        await getMealRecipesFromCache(id)
            .then((recipeData) => {
                if (recipeData) {
                    setRecipe(recipeData);
                    setOpenModal(true);
                }
            })
            .catch((err) => console.error("Error fetching recipe:", err));
    };

    return (
        <div className="w-64">
            <div className="flex min-h-[25rem] flex-col bg-orange-50 rounded-md shadow-md hover:scale-105 transition-all duration-100 hover:shadow-md hover:shadow-emerald-500 relative">
                <div className="image w-full max-h-42 overflow-hidden  ">
                    <img
                        className="w-full max-h-100 object-cover rounded-md rounded-b-none"
                        src={item.strMealThumb}
                        alt=""
                    />
                </div>
                <div className="desc w-full p-2 flex flex-col">
                    <div className="mb-6">
                        <p className="capitalize text-md font-bold">
                            {item.strMeal}
                        </p>
                    </div>

                    <button
                        onClick={() => handleClick(item.idMeal)}
                        className="bg-green-400 px-4 py-2 mt-2 w-[90%] rounded-md absolute bottom-2 left-3"
                    >
                        Get Recipe
                    </button>
                </div>
            </div>
            {openModal && (
                <Recipe
                    closeModal={() => setOpenModal(false)}
                    recipe={recipe}
                />
            )}
        </div>
    );
};

export default Card;
