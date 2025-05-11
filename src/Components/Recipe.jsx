import React, { useRef, useEffect } from "react";
import { IoCloseCircle } from "react-icons/io5";

const Recipe = ({ closeModal, recipe }) => {
    const modalRef = useRef();

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [closeModal]);

    if (!recipe || recipe.length === 0) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <h1 className="text-2xl text-gray-600 font-extrabold">
                    No Recipe Found
                </h1>
            </div>
        );
    }

    const data = recipe;

    console.log("recipe", recipe);

    if (!data) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <h1 className="text-2xl text-red-600 font-extrabold">
                    Error: Recipe data is unavailable
                </h1>
            </div>
        );
    }

    const {
        strMeal,
        strCategory,
        strArea,
        strInstructions,
        strSource,
        strTags,
    } = data;

    // Extract ingredients and measures
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = data[`strIngredient${i}`];
        const measure = data[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push(
                <span key={i}>
                    <strong>{ingredient.trim()}</strong>:{" "}
                    {measure?.trim() || ""}
                </span>
            );
        }
    }

    // Remove the leading number (step number) in instructions, keeping the line
    let instructions = strInstructions
        .split(/\r?\n/)
        .filter((line) => line.trim() !== "") // Remove empty lines
        .map((line) => line.trim().replace(/^\d+\.\s*/, "")); // Remove numbers with dots

    // Merge instructions where the first letter is not capitalized
    const formattedInstructions = [];
    let currentInstruction = "";

    instructions.forEach((line, index) => {
        if (line.charAt(0) === line.charAt(0).toLowerCase()) {
            // If the first letter is lowercase, append the line to the current instruction
            currentInstruction += " " + line;
        } else {
            // If the first letter is uppercase, push the current instruction and start a new one
            if (currentInstruction) {
                formattedInstructions.push(currentInstruction);
            }
            currentInstruction = line;
        }
    });

    // Push the last instruction if there is any
    if (currentInstruction) {
        formattedInstructions.push(currentInstruction);
    }

    return (
        <div>
            <div className="min-w-screen min-h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
                <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
                <div
                    ref={modalRef}
                    className="w-[90%] pb-28 max-h-screen mt-20 h-[600px] overflow-y-scroll max-w-2xl p-8 relative mx-auto my-auto rounded-xl shadow-lg bg-white"
                >
                    <span
                        className="absolute top-2 right-3 cursor-pointer w-7 rounded-full"
                        onClick={() => closeModal(false)}
                    >
                        <IoCloseCircle className="w-9 h-9" onClick={() => closeModal(false)} />
                    </span>

                    <h1 className="text-3xl text-center font-bold mb-4">{strMeal}</h1>
                    {strTags && (
                        <div className="mt-2 mb-4 flex flex-wrap gap-2">
                            {data.strTags.split(",").map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-cyan-100 text-cyan-800 text-xs font-semibold px-2.5 py-0.5 rounded-full"
                                >
                                    {tag.trim()}
                                </span>
                            ))}
                        </div>
                    )}
                    <p className="text-gray-700 mb-1">
                        <strong>Category:</strong> {strCategory}
                    </p>
                    <p className="text-gray-700 mb-1">
                        <strong>Area:</strong> {strArea}
                    </p>

                    <h2 className="text-xl font-semibold mt-4 mb-2">
                        Ingredients:
                    </h2>
                    <ul className="list-disc pl-6 text-sm space-y-1">
                        {ingredients.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>

                    <h2 className="text-xl font-semibold mt-6 mb-2">
                        Instructions:
                    </h2>
                    <ul className="list-decimal pl-6 text-sm space-y-2">
                        {formattedInstructions.map((line, index) => (
                            <li key={index}>{line}</li>
                        ))}
                    </ul>

                    {strSource && (
                        <p className="mt-6 text-sm">
                            <strong>Source:</strong>{" "}
                            <a
                                href={strSource}
                                className="text-blue-600 underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {strSource}
                            </a>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Recipe;
