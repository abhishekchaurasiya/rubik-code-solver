export class RubiksCube {
  state;
  constructor() {
    this.state = this.getSovledState();
  }

  // Define the color states
  getSovledState() {
    return {
      front: Array(9).fill("g"), // Green
      back: Array(9).fill("b"), // Blue
      left: Array(9).fill("o"), // Orange
      right: Array(9).fill("r"), // Red
      up: Array(9).fill("w"), // White
      down: Array(9).fill("y"), // Yellow
    };
  }

  // Get all colors
  getState() {
    return JSON.parse(JSON.stringify(this.state));
  }

  // Set new state
  setState(newState) {
    this.state = JSON.parse(JSON.stringify(newState));
  }

  // Get all combined state string
  getStateString() {
    // Convert to format expected by getCuvSvg: up, right, front, down, right, left, back
    return (
      this.state.up.join("") +
      this.state.right.join("") +
      this.state.front.join("") +
      this.state.down.join("") +
      this.state.left.join("") +
      this.state.back.join("")
    );
  }

  rotateFaceClockWise(face) {
    // Rotate 3x3 face 90 degrees clockwise
    const newFace = [...face];
    newFace[0] = face[6];
    newFace[1] = face[3];
    newFace[2] = face[0];
    newFace[3] = face[7];
    newFace[4] = face[4];
    newFace[5] = face[1];
    newFace[6] = face[8];
    newFace[7] = face[5];
    newFace[8] = face[2];
    return newFace;
  }

  rotateFaceCounterClockWise(face) {
    // Rotate 3x3 face 90 degrees counter-clockwise
    const newFace = [...face];
    newFace[0] = face[2];
    newFace[1] = face[5];
    newFace[2] = face[8];
    newFace[3] = face[1];
    newFace[4] = face[4];
    newFace[5] = face[7];
    newFace[6] = face[0];
    newFace[7] = face[3];
    newFace[8] = face[6];
    return newFace;
  }
  executeMove(move) {
    switch (move) {
      case "F":
        this.rotateF();
        break;
      case "F'":
        this.rotateFPrime();
        break;
      case "B":
        this.rotateB();
        break;
      case "B'":
        this.rotateBPrime();
        break;
      case "U":
        this.rotateU();
        break;
      case "U'":
        this.rotateUPrime();
        break;
      case "D":
        this.rotateD();
        break;
      case "D'":
        this.rotateDPrime();
        break;
      case "R":
        this.rotateR();
        break;
      case "R'":
        this.rotateRPrime();
        break;
      case "L":
        this.rotateL();
        break;
      case "L'":
        this.rotateLPrime();
        break;
    }
  }

  scramble(moves = 20) {
    const possibleMoves = [
      "F",
      "F'",
      "R",
      "R'",
      "U",
      "U'",
      "L",
      "L'",
      "D",
      "D'",
      "B",
      "B'",
    ];
    const scrambleMoves = [];
    for (let i = 0; i < moves; i++) {
      const randomMoves =
        possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      this.executeMove(randomMoves);

      scrambleMoves.push(randomMoves);
    }
    return scrambleMoves;
  }

  isSolved() {
    const solved = this.getSovledState();
    return JSON.stringify(this.state) === JSON.stringify(solved);
  }

  reset() {
    this.state = this.getSovledState();
  }

  // Front clockwise
  rotateF() {
    this.state.front = this.rotateFaceClockWise(this.state.front);

    // Rotate adjacent edges
    const temp = [this.state.up[6], this.state.up[7], this.state.up[8]];
    this.state.up[6] = this.state.left[8];
    this.state.up[7] = this.state.left[5];
    this.state.up[8] = this.state.left[2];

    this.state.left[2] = this.state.down[0];
    this.state.left[5] = this.state.down[1];
    this.state.left[8] = this.state.down[2];

    this.state.down[0] = this.state.right[6];
    this.state.down[1] = this.state.right[3];
    this.state.down[2] = this.state.right[0];

    this.state.right[0] = temp[0];
    this.state.right[3] = temp[1];
    this.state.right[6] = temp[2];
  }

  // Front counter clockwise
  rotateFPrime() {
    this.state.front = this.rotateFaceCounterClockWise(this.state.front);
    // Rotate adjacent edges (opposite of F)
    // const temp = [this.state.up[6], this.state.up[7], this.state.up[8]];

    this.state.up[6] = this.state.right[0];
    this.state.up[7] = this.state.right[3];
    this.state.up[8] = this.state.right[6];

    this.state.right[0] = this.state.down[2];
    this.state.right[3] = this.state.down[1];
    this.state.right[6] = this.state.down[0];

    this.state.down[0] = this.state.left[2];
    this.state.down[1] = this.state.left[5];
    this.state.down[2] = this.state.left[8];

    this.state.left[2] = this.state.up[8];
    this.state.left[5] = this.state.up[7];
    this.state.left[8] = this.state.up[6];
  }

  // Right clockwise
  rotateR() {
    // Rotate right face clockwise
    this.state.right = this.rotateFaceClockWise(this.state.right);

    const temp = [this.state.up[2], this.state.up[5], this.state.up[8]];

    this.state.up[2] = this.state.front[2];
    this.state.up[5] = this.state.front[5];
    this.state.up[8] = this.state.front[8];

    this.state.front[2] = this.state.down[2];
    this.state.front[5] = this.state.down[5];
    this.state.front[8] = this.state.down[8];

    this.state.down[2] = this.state.back[6];
    this.state.down[5] = this.state.back[3];
    this.state.down[8] = this.state.back[0];

    this.state.back[0] = temp[2];
    this.state.back[3] = temp[1];
    this.state.back[6] = temp[0];
  }
  // Right counter clockwise
  rotateRPrime() {
    // Rotate right face counter clockwise
    this.state.right = this.rotateFaceCounterClockWise(this.state.right);

    const temp = [this.state.up[2], this.state.up[5], this.state.up[8]];

    this.state.up[2] = this.state.back[6];
    this.state.up[5] = this.state.back[3];
    this.state.up[8] = this.state.back[0];

    this.state.back[0] = this.state.down[8];
    this.state.back[3] = this.state.down[5];
    this.state.back[6] = this.state.down[2];

    this.state.down[2] = this.state.front[2];
    this.state.down[5] = this.state.front[5];
    this.state.down[8] = this.state.front[8];

    this.state.front[2] = temp[0];
    this.state.front[5] = temp[1];
    this.state.front[8] = temp[2];
  }

  // Up clockwise
  rotateU() {
    // Roate up face clockwise
    this.state.up = this.rotateFaceClockWise(this.state.up);
    const temp = [
      this.state.front[0],
      this.state.front[1],
      this.state.front[2],
    ];

    this.state.front[0] = this.state.right[0];
    this.state.front[1] = this.state.right[1];
    this.state.front[2] = this.state.right[2];

    this.state.right[0] = this.state.back[0];
    this.state.right[1] = this.state.back[1];
    this.state.right[2] = this.state.back[2];

    this.state.back[0] = this.state.left[0];
    this.state.back[1] = this.state.left[1];
    this.state.back[2] = this.state.left[2];

    this.state.left[0] = temp[0];
    this.state.left[1] = temp[1];
    this.state.left[2] = temp[2];
  }
  // Up counter clockwise
  rotateUPrime() {
    // Roate up face counter clockwise
    this.state.up = this.rotateFaceCounterClockWise(this.state.up);
    const temp = [
      this.state.front[0],
      this.state.front[1],
      this.state.front[2],
    ];

    this.state.front[0] = this.state.left[0];
    this.state.front[1] = this.state.left[1];
    this.state.front[2] = this.state.left[2];

    this.state.left[0] = this.state.back[0];
    this.state.left[1] = this.state.back[1];
    this.state.left[2] = this.state.back[2];

    this.state.back[0] = this.state.right[0];
    this.state.back[1] = this.state.right[1];
    this.state.back[2] = this.state.right[2];

    this.state.right[0] = temp[0];
    this.state.right[1] = temp[1];
    this.state.right[2] = temp[2];
  }

  // Left clockwise
  rotateL() {
    // Roate left face clockwise
    this.state.left = this.rotateFaceClockWise(this.state.left);

    const temp = [this.state.up[0], this.state.up[3], this.state.up[6]];

    this.state.up[0] = this.state.back[8];
    this.state.up[3] = this.state.back[5];
    this.state.up[6] = this.state.back[2];

    this.state.back[2] = this.state.down[6];
    this.state.back[5] = this.state.down[3];
    this.state.back[8] = this.state.down[0];

    this.state.down[0] = this.state.front[0];
    this.state.down[3] = this.state.front[3];
    this.state.down[6] = this.state.front[6];

    this.state.front[0] = temp[0];
    this.state.front[3] = temp[1];
    this.state.front[6] = temp[2];
  }

  // Left counter clockwise
  rotateLPrime() {
    // Roate left face counter clockwise
    this.state.left = this.rotateFaceCounterClockWise(this.state.left);
    // const temp = [this.state.up[0], this.state.up[3], this.state.up[6]];

    this.state.up[0] = this.state.front[0];
    this.state.up[3] = this.state.front[3];
    this.state.up[6] = this.state.front[6];

    this.state.front[0] = this.state.down[0];
    this.state.front[3] = this.state.down[3];
    this.state.front[6] = this.state.down[6];

    this.state.down[0] = this.state.back[8];
    this.state.down[3] = this.state.back[5];
    this.state.down[6] = this.state.back[2];

    this.state.back[2] = this.state.up[6];
    this.state.back[5] = this.state.up[3];
    this.state.back[8] = this.state.up[0];
  }

  // Down counter clockwise
  rotateD() {
    // Rotate down face clockwise
    this.state.down = this.rotateFaceClockWise(this.state.down);
    const temp = [
      this.state.front[6],
      this.state.front[7],
      this.state.front[8],
    ];

    this.state.front[6] = this.state.left[6];
    this.state.front[7] = this.state.left[7];
    this.state.front[8] = this.state.left[8];

    this.state.left[6] = this.state.back[6];
    this.state.left[7] = this.state.back[7];
    this.state.left[8] = this.state.back[8];

    this.state.back[6] = this.state.right[6];
    this.state.back[7] = this.state.right[7];
    this.state.back[8] = this.state.right[8];

    this.state.right[6] = temp[0];
    this.state.right[7] = temp[1];
    this.state.right[8] = temp[2];
  }

  rotateDPrime() {
    // Rotate down face counter clockwise
    this.state.down = this.rotateFaceCounterClockWise(this.state.down);
    const temp = [
      this.state.front[6],
      this.state.front[7],
      this.state.front[8],
    ];

    this.state.front[6] = this.state.right[6];
    this.state.front[7] = this.state.right[7];
    this.state.front[8] = this.state.right[8];

    this.state.right[6] = this.state.back[6];
    this.state.right[7] = this.state.back[7];
    this.state.right[8] = this.state.back[8];

    this.state.back[6] = this.state.left[6];
    this.state.back[7] = this.state.left[7];
    this.state.back[8] = this.state.left[8];

    this.state.left[6] = temp[0];
    this.state.left[7] = temp[1];
    this.state.left[8] = temp[2];
  }

  // Back clockwise
  rotateB() {
    // Roate back face clockwise
    this.state.back = this.rotateFaceClockWise(this.state.back);
    const temp = [this.state.up[0], this.state.up[1], this.state.up[2]];

    this.state.up[0] = this.state.right[2];
    this.state.up[1] = this.state.right[5];
    this.state.up[2] = this.state.right[8];

    this.state.right[2] = this.state.down[8];
    this.state.right[5] = this.state.down[7];
    this.state.right[8] = this.state.down[6];

    this.state.down[6] = this.state.left[0];
    this.state.down[7] = this.state.left[3];
    this.state.down[8] = this.state.left[6];

    this.state.left[0] = temp[2];
    this.state.left[3] = temp[1];
    this.state.left[6] = temp[0];
  }

  rotateBPrime() {
    // Roate back face couter clockwise
    this.state.back = this.rotateFaceCounterClockWise(this.state.back);
    const temp = [this.state.up[0], this.state.up[1], this.state.up[2]];

    this.state.up[0] = this.state.left[6];
    this.state.up[1] = this.state.left[3];
    this.state.up[2] = this.state.left[0];

    this.state.left[0] = this.state.down[6];
    this.state.left[3] = this.state.down[7];
    this.state.left[6] = this.state.down[8];

    this.state.down[6] = this.state.right[8];
    this.state.down[7] = this.state.right[5];
    this.state.down[8] = this.state.right[2];

    this.state.right[2] = temp[0];
    this.state.right[5] = temp[1];
    this.state.right[8] = temp[2];
  }
}

// console.log(RubikCubeClass.getState());

// RubikCubeClass.setState({
//   ram: ["y", "y", "y", "y", "y", "y", "y", "y", "y"],
// });
// console.log(RubikCubeClass.getStateString());
// console.log(RubikCubeClass.rotateFaceCounterClockWise());

// const d = RubikCubeClass.scramble();
// console.log("data: ", d);

// console.log(RubikCubeClass.isSolved());
// RubikCubeClass.reset();
// console.log(RubikCubeClass.isSolved());

// console.log(RubikCubeClass.rotateFaceClockWise([]))
// console.log(RubikCubeClass.rotateFaceCounterClockWise([]))
