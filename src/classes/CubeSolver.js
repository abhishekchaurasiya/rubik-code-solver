
export class CubeSolver {
  cube;
  steps = [];
  constructor(cube) {
    this.cube = cube;
  }

  addeStep(move, description) {
    this.cube.executeMove(move);
    this.steps.push({
      move,
      description,
      cubeState: this.cube.getStateString(),
    });
  }

  executeAlgorithm(moves, description) {
    moves.forEach((move) => {
      this.addeStep(move, description);
    });
  }

  solve() {
    this.steps = [];
    // All initial states
    this.steps.push({
      move: "",
      description: "Initial Scramble State",
      cubeState: this.cube.getStateString(),
    });
    try {
      // Solve white cross (bottom layer)
      this.solveWhiteCross();
      // Solve white corners (complete bottom layer)
      this.solveWhiteCorners();
      // Sole middle layer edges
      this.solveMiddleLayer();
      // Solve yellow cross (top layer)
      this.solveYellowCross();
      // Orient yellow corners
      this.orientYellowCorners();
      // Permute yellow corners
      this.permuteYellowCorners();
      // Permute yellow edges
      this.permuteYellowEdges();
    } catch (error) {
      console.log("Solving error: ", error);
      this.steps.push({
        move: "",
        description: "Solving incomplete- ",
        cubeState: this.cube.getStateString(),
      });
    }
    return this.steps;
  }

  solveWhiteCross() {
    // const state = this.cube.getState();
    const noramlCrossMoves = ["F", "R", "U", "R'", "U'", "F'"];
    this.executeAlgorithm(noramlCrossMoves, "Working on whit cross formation");
  }

  solveWhiteCorners() {
    const cornerValue = ["R", "U", "R'", "U'"];
    for (let i = 0; i < 4; i++) {
      this.executeAlgorithm(cornerValue, `Positioning white corner ${i + 1}`);
    }
  }

  solveMiddleLayer() {
    const rightHandValue = ["U", "R", "U'", "R'", "U'", "F'", "U", "F"];
    const leftHandValue = ["U'", "L'", "U", "L", "U", "F", "U'", "F'"];
    this.executeAlgorithm(
      rightHandValue,
      "Solving middle layer - right hand algo"
    );
    this.executeAlgorithm(
      leftHandValue,
      "Solving middle layer - left hand algo"
    );
  }

  solveYellowCross() {
    const yellowCrossValue = ["F", "R", "U", "R'", "U'", "F'"];
    for (let i = 0; i < 3; i++) {
      this.executeAlgorithm(
        yellowCrossValue,
        `Yellow cross formation- attemp ${i + 1}`
      );
    }
  }

  orientYellowCorners() {
    const suneAlgo = ["R", "U", "R'", "U", "R", "U", "U", "R'"];
    for (let i = 0; i < 4; i++) {
      this.executeAlgorithm(
        suneAlgo,
        `Orienting yellow corners - position ${i + 1}`
      );
      if (i < 3) this.addeStep("U", "Rotating top layer");
    }
  }

  permuteYellowCorners() {
    const topPermuteAlgo = [
      "R",
      "U",
      "R'",
      "F'",
      "R",
      "U",
      "R'",
      "U'",
      "R'",
      "F",
      "R",
      "R",
      "U'",
      "R'",
      "U'",
    ];
    this.executeAlgorithm(topPermuteAlgo, "Permuting yellow corners");
  }

  permuteYellowEdges() {
    const hPermuteAlgo = [
      "R",
      "R",
      "U",
      "R",
      "U",
      "R'",
      "U",
      "R'",
      "U",
      "R'",
      "U",
      "R'",
    ];
    this.executeAlgorithm(hPermuteAlgo, "Permuting yellow edges - final steps");
  }

  getSteps() {
    return this.steps;
  }
}
