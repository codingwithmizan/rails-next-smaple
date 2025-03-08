import React from "react";

const Home = async () => {
  return (
    <div className="m-10 bg-amber-800 text-white">
      <h2>Home page</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur
        voluptatum eius architecto aspernatur quibusdam maxime exercitationem
        aut perspiciatis sit, repudiandae ab tempora iste autem nostrum! Iure
        distinctio minus optio nam.

        Base URL: {process.env.NEXT_PUBLIC_API_URL}
      </p>
    </div>
  );
};

export default Home;
