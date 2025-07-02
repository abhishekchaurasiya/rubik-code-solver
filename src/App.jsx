import { useCallback, useState } from "react";
import { CubeSolver } from "./classes/CubeSolver";
import CubeControls from "./components/CubeControls";
import Heading from "./components/Heading";
import CubeDisplay from "./components/CubeDisplay";
import StepDisplay from "./components/StepDisplay";
import { RubiksCube as RubikCube } from "./classes/RubikCube";
import AlgoInfo from "./components/AlgoInfo";

const App = () => {
  const [cube] = useState(() => new RubikCube());
  const [cubeState, setCubeState] = useState(cube.getStateString());
  const [solveSteps, setSolveSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSolving, setIsSolving] = useState(false);
  const [scrambleMoves, setScrambleMoves] = useState([]);

  const updateCubeState = useCallback(() => {
    setCubeState(cube.getStateString());
  }, [cube]);

  const handleMove = useCallback(
    (move) => {
      cube.executeMove(move);
      updateCubeState();
    },
    [cube, updateCubeState]
  );

  const handleScramble = useCallback(() => {
    const moves = cube.scramble(20);
    setScrambleMoves(moves);
    updateCubeState();
    setSolveSteps([]);
    setCurrentStep(0);
  }, [cube, updateCubeState]);

  const handleReset = useCallback(() => {
    cube.reset();
    updateCubeState();
    setSolveSteps([]);
    setCurrentStep(0);
    setScrambleMoves([]);
  }, [cube, updateCubeState]);

  const handleSovle = useCallback(async () => {
    setIsSolving(true);
    // Create a copy of the cube for solving
    const solvingCube = new RubikCube();
    solvingCube.setState(cube.getState());

    const solver = new CubeSolver(solvingCube);

    // simulate async solving process
    await new Promise((resolve) => setTimeout(resolve, 500));
    const steps = solver.solve();
    setSolveSteps(steps);
    setCurrentStep(0);
    setIsSolving(false);
  }, [cube]);

  const handleStepChage = useCallback((step) => {
    setCurrentStep(step);
  }, []);

  const isCubeSolved = cube.isSolved();

  return (
    <div className="min-h-screen bg-gray-200 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <Heading />
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left column - current cube state */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl text-center font-semibold mb-4">
                Current Cube State
              </h2>
              <CubeDisplay cubeState={cubeState} className="mb-4" />

              <div className="text-center space-y-2 ">
                <div
                  className={`text-lg font-semibold ${
                    isCubeSolved ? "text-green-00" : "text-orange-600"
                  }`}
                >
                  {isCubeSolved ? "Solved" : "Scrambeld"}
                </div>
                {scrambleMoves.length > 0 && (
                  <div className="text-sm text-slate-600">
                    <p>Last Scramble: {scrambleMoves.join(" ")}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <CubeControls
                onMove={handleMove}
                onScramble={handleScramble}
                onReset={handleReset}
                onSolve={handleSovle}
                isDisabled={isSolving}
              />
              {isSolving && (
                <div className="text-center mt-4">
                  <div className="inline-flex items-center space-x-2">
                    <div className=" animate-spin rounded-full h-4 w-4 border-b-2 bg-blue-500"></div>
                    <span className="text-blue-600">Solving cube...</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right column - Solution steps */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <StepDisplay
              steps={solveSteps}
              currStep={currentStep}
              onStepChange={handleStepChage}
            />
          </div>
        </div>

        {/* Algorithm info */}
        <AlgoInfo />
      </div>
    </div>
  );
};

export default App;
