// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import NewsBoard from "./components/NewsBoard";

const App = () => {
  const [category, setCategory] = useState("technology"); // Initial category state

  return (
    <div>
      {/* {<Navbar setCategory={setCategory}} /> */}
      <NewsBoard category={category} />
    </div>
  );
};

export default App;
