import React from "react";

const Heading = () => {
  return (
    <header className=" text-center mb-8">
      <h1 className="text-4xl font-black text-slate-800 mb-2">
        Rubik's Cube Solver Algorithm
      </h1>
      <p className="text-slate-600 max-w-2xl mx-auto">
        An interactive Rubik's Cube solver built in ReactJs. Use manual controls
        to rotate faces, scramble the cube or let the algorithm solve it
        automatically.
      </p>
    </header>
  );
};

export default Heading;
