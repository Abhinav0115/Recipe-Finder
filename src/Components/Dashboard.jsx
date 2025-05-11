import React, { useEffect, useState } from "react";
import Card from "./Card";
import { NavContext } from "../App";
import { useContext } from "react";

const Dashboard = (props) => {
    const meals = props.meals?.meals || [];

    const navMode = useContext(NavContext);
    const [mealType, setMealType] = useState("Vegetarian");

    const loading = navMode.loading;

    useEffect(() => {
        if (navMode.search) {
            setMealType(navMode.search);
        } else if (navMode.area) {
            setMealType(navMode.area);
        } else if (navMode.category) {
            setMealType(navMode.category);
        }
    }, [navMode.category, navMode.area, navMode.search]);

    return (
        <div className={`grow  p-2 transition-all w-[100vw]  duration-100 m-4`}>
            <h1 className="text-3xl text-center font-extrabold mb-4 w-full">
                {mealType && (
                    <span className=" text-emerald-500 font-extrabold">
                        {mealType[0].toUpperCase() + mealType.slice(1)}{" "}
                    </span>
                )}
                Meals Recipe
            </h1>
            {loading ? (
                <div className="text-center py-10 mt-20 text-gray-600 font-semibold text-2xl">
                    Loading meals recipes...
                </div>
            ) : (
                <div className="flex flex-wrap gap-6 justify-center w-full py-4 ">
                    {meals.length > 0 ? (
                        meals.map((item, index) => (
                            <Card key={index} item={item} />
                        ))
                    ) : (
                        <h1 className="text-2xl mt-20 text-gray-600 font-extrabold">
                            No Meals Recipe Found
                        </h1>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
