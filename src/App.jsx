import { createContext, useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import axios from "axios";
import {
    getMealByCategory,
    getMealByName,
    getMealByArea,
} from "./utils/mealMethods";

export const NavContext = createContext(true);

function App() {
    const getInitialNavState = () => window.innerWidth >= 750;

    const [open, setOpen] = useState(getInitialNavState);
    const [meals, setMeals] = useState([]);
    const [category, setCategory] = useState("Vegetarian");
    const [area, setArea] = useState("");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    // Adjust nav open state when screen is resized
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 750) {
                setOpen(false);
            } else {
                setOpen(true);
            }
        };
        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Fetch meals whenever category, search, or area changes
    useEffect(() => {
        const fetchMeals = async () => {
            setLoading(true);

            try {
                let cacheKey = "";
                let result = null;
                const maxAge = 1000 * 60 * 10; // 10 minutes

                // Determine the cache key based on current state
                if (search) {
                    cacheKey = `search-${search}`;
                } else if (category) {
                    cacheKey = `category-${category}`;
                } else if (area) {
                    cacheKey = `area-${area}`;
                }

                // Try reading from localStorage
                const cached = cacheKey ? localStorage.getItem(cacheKey) : null;

                if (cached) {
                    const parsed = JSON.parse(cached);

                    const isValidCache =
                        Date.now() - parsed.timestamp < maxAge &&
                        parsed.data?.meals &&
                        parsed.data.meals.length > 0;

                    if (isValidCache) {
                        result = parsed.data;
                        // console.log(`Loaded ${cacheKey} from cache`);
                    } else {
                        // console.log(
                        //     `Invalid/empty cache for ${cacheKey}, refetching...`
                        // );
                        localStorage.removeItem(cacheKey); // Optional: clean invalid cache
                    }
                }

                // If no valid cache, fetch from API
                if (!result) {
                    if (search) {
                        result = await getMealByName(search);
                    } else if (category) {
                        result = await getMealByCategory(category);
                    } else if (area) {
                        result = await getMealByArea(area);
                    }

                    // Save to cache
                    if (cacheKey && result?.meals?.length > 0) {
                        localStorage.setItem(
                            cacheKey,
                            JSON.stringify({
                                data: result,
                                timestamp: Date.now(),
                            })
                        );
                        // console.log(`Saved ${cacheKey} to cache`);
                    }
                }

                setMeals(result);
            } catch (err) {
                console.error("Error fetching meals:", err);
                setMeals([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMeals();
    }, [category, search, area]);

    const toggleNav = () => setOpen(!open);

    const changeCategory = (value) => {
        // console.log("category changed");
        if (value === category) return;
        setCategory(value);
        // setArea("");
        // setSearch("");
    };

    const updateSearch = (value) => {
        setSearch(value);
    };

    const changeArea = (value) => {
        // console.log("area changed");
        if (value === area) return;
        setArea(value);
        // setCategory("");
        // setSearch("");
    };

    return (
        <div className="App">
            <NavContext.Provider
                value={{
                    open,
                    toggleNav,
                    category,
                    changeCategory,
                    search,
                    updateSearch,
                    area,
                    changeArea,
                    loading,
                }}
            >
                <Navbar />
                <Home meals={meals} />
            </NavContext.Provider>
        </div>
    );
}

export default App;
