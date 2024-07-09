import React from "react";
import List from "./Lista"; 

const Home = () => {
    return (
        <div className="container">
            <h1 className="text-center mt-5">todos</h1>
            <List />
        </div>
    );
};

export default Home;