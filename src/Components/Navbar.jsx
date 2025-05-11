import React, { useContext } from "react";
import { NavContext } from "../App";

const Navbar = () => {
    const navMode = useContext(NavContext);

    return (
        <div className="flex justify-left gap-6 px-8 py-4 pb-2 shadow-md">
            <div
                className="nav text-black cursor-pointer"
                onClick={() => navMode.toggleNav()}
            >
                <svg viewBox="0 0 100 80" width="30" height="50">
                    <rect width="100" height="10"></rect>
                    <rect y="30" width="80" height="10"></rect>
                    <rect y="60" width="60" height="10"></rect>
                </svg>
            </div>
            <div className="logo flex items-center">
                <img src="/recipe2.png" alt="Logo" className="h-12 w-14" />
                <h2 className="text-2xl font-extrabold text-emerald-500 p-2 rounded-md border-green-300 ">
                    Recipe Finder
                </h2>
            </div>
        </div>
    );
};

export default Navbar;
