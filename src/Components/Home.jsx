import React, { useContext } from "react";
import Dashboard from "./Dashboard";
import Sidebar from "./Sidebar";

const Home = (props) => {

    return (
        <div className="flex flex-col md:flex-row">
            <Sidebar />
            <Dashboard meals={props.meals} />
        </div>
    );
};

export default Home;
