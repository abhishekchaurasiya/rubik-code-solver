import React from "react";
import CubeDisplay from "./CubeDisplay";

const StepDisplay = ({ steps, currStep, onStepChange }) => {
  if (steps.length === 0) {
    return (
      <div className="text-center text-slate-500 py-8">
        No solving steps available. Scramble the cube and click "Solve" to see
        the solution process.
      </div>
    );
  }
  const currentStepData = steps[currStep];

  return (
    <div className=" space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-bold mb-2">Solution Steps</h3>
        <p className="text-slate-600">
          Step {currStep + 1} of {steps.length}
        </p>
      </div>

      <div className="flex justify-center">
        <CubeDisplay cubeState={currentStepData.cubeState} />
      </div>

      <div className="bg-slate-100 rounded-lg p-4">
        <div className="text-center space-y-2">
          {currentStepData?.move && (
            <div className="text-2xl font-mono font-bold text-blue-600">
              {currentStepData?.move}
            </div>
          )}
          <div className="text-slate-700">{currentStepData.description}</div>
        </div>
      </div>

      <div className="flex  justify-center space-x-4">
        <button
          onClick={() => onStepChange(Math.max(0, currStep - 1))}
          disabled={currStep === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600
                   disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-200 rounded">
          {currStep + 1} / {steps.length}
        </span>
        <button
          onClick={() => onStepChange(Math.min(steps.length - 1, currStep + 1))}
          disabled={currStep === steps.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600
                   disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={() => onStepChange(0)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors mr-2"
        >
          First Step
        </button>
        <button
          onClick={() => onStepChange(steps.length - 1)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Last Step
        </button>
      </div>
    </div>
  );
};
export default StepDisplay;
