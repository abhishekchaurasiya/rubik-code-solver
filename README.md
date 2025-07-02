
# 🎲 Rubik's Cube Solver

A comprehensive, interactive Rubik's Cube solver built with **React**, **javascript**, **Tailwind CSS**, and **Vite**. This project demonstrates advanced programming concepts including object-oriented design, algorithm implementation, and modern web development practices.

## 🌟 Features

### Core Functionality
- **🎯 Complete Cube Simulation**: Full 3×3×3 Rubik's Cube representation with accurate physics
- **🔄 Manual Controls**: Interactive face rotation with standard notation (F, R, U, L, D, B, F', R', U', L', D', B')
- **🎲 Smart Scrambling**: Intelligent scramble generation with configurable complexity
- **🤖 Automated Solving**: Layer-by-layer solving algorithm with step-by-step visualization
- **📊 Solution Tracking**: Complete move history and step-by-step playback
- **🎨 Visual Representation**: Clean SVG-based cube display with color-coded faces


## 🏗️ Technical Architecture

### Object-Oriented Design
\`\`\`
RubiksCube Class
├── State Management (6 faces × 9 squares)
├── Rotation Logic (12 basic moves + combinations)
├── Validation System (move legality, state consistency)
└── Utility Methods (scrambling, reset, state export)

CubeSolver Class
├── Layer-by-Layer Algorithm
├── Pattern Recognition
├── Move Optimization
└── Step Documentation
\`\`\`

### Component Architecture
\`\`\`
src/
├── classes/
│   ├── RubiksCube.ts      # Core cube logic and state management
│   └── CubeSolver.ts      # Solving algorithms and step tracking
├── components/
│   ��── CubeDisplay.jsx    # SVG-based cube visualization
│   ├── CubeControls.jsx   # User interaction interface
│   └── StepDisplay.jsx    # Solution step navigation
│   └── Heading.jsx        # Heading Info
│   └── AlgoInfo.jsx       # About of algorithm
├── lib/
│   └── cubeSvg.ts         # SVG generation utilities
└── App.tsx                # Main application orchestrator
\`\`\`

## 🚀 Quick Start

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/abhishekchaurasiya/rubik-code-solver
   cd rubiks-cube-solver
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install


3. **Start development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open in browser**
   \`\`\`
   http://localhost:5173
   \`\`\`

### Build for Production
\`\`\`bash
npm run build
npm run preview
\`\`\`

## 🎮 Usage Guide

### Basic Operations

#### Manual Cube Control
- **Face Rotations**: Click any move button (F, R, U, L, D, B) for clockwise rotation
- **Reverse Rotations**: Use prime notation (F', R', U', L', D', B') for counterclockwise
- **Scramble**: Generate random cube configuration with 20 moves
- **Reset**: Return cube to solved state

#### Automated Solving
1. **Scramble** the cube using the scramble button
2. Click **"Auto Solve"** to start the solving algorithm
3. Use **step navigation** to review the solution process
4. **Forward/Backward** buttons to examine each move

### Move Notation System
\`\`\`
F  = Front face clockwise       F' = Front face counterclockwise
R  = Right face clockwise       R' = Right face counterclockwise
U  = Up face clockwise          U' = Up face counterclockwise
L  = Left face clockwise        L' = Left face counterclockwise
D  = Down face clockwise        D' = Down face counterclockwise
B  = Back face clockwise        B' = Back face counterclockwise
\`\`\`

### Color Coding
- **🟩 Green**: Front face
- **🟦 Blue**: Back face
- **🟧 Orange**: Left face
- **🟥 Red**: Right face
- **⬜ White**: Up face (top)
- **🟨 Yellow**: Down face (bottom)

## 🧠 Algorithm Deep Dive

### Layer-by-Layer Solving Method

Our implementation uses the beginner-friendly **Layer-by-Layer (LBL)** method, which solves the cube in seven distinct phases:

#### Phase 1: White Cross Formation
\`\`\`javascript
// Objective: Create a white cross on the bottom layer
// Algorithm: Position white edge pieces correctly
// Moves: F, R, U, R', U', F' (and variations)
\`\`\`

#### Phase 2: White Corner Positioning
\`\`\`javascript
// Objective: Complete the white (bottom) layer
// Algorithm: Right-hand algorithm for corner insertion
// Moves: R, U, R', U' (repeated as needed)
\`\`\`

#### Phase 3: Middle Layer Edge Solving
\`\`\`javascript
// Objective: Position middle layer edge pieces
// Algorithms:
//   - Right-hand: U, R, U', R', U', F', U, F
//   - Left-hand: U', L', U, L, U, F, U', F'
\`\`\`

#### Phase 4: Yellow Cross Formation
\`\`\`javascript
// Objective: Form yellow cross on top layer
// Algorithm: F, R, U, R', U', F'
// Pattern: Line → L-shape → Cross
\`\`\`

#### Phase 5: Yellow Corner Orientation
\`\`\`javascript
// Objective: Orient all yellow corners correctly
// Algorithm: Sune - R, U, R', U, R, U, U, R'
// Repeat until all corners show yellow on top
\`\`\`

#### Phase 6: Yellow Corner Permutation
\`\`\`javascript
// Objective: Position yellow corners in correct locations
// Algorithm: T-Perm and A-Perm variations
// Complex move sequences for corner cycling
\`\`\`

#### Phase 7: Yellow Edge Permutation
\`\`\`javascript
// Objective: Final positioning of yellow edges
// Algorithm: H-Perm and U-Perm for edge cycling
// Completes the cube solution
\`\`\`

## 🔧 Technical Implementation

### Core Data Structures

#### Cube State Representation
\`\`\`javascript
interface CubeState {
  front =>  // 9 squares: [0,1,2,3,4,5,6,7,8]
  back =>   // Indexed left-to-right, top-to-bottom
  left =>   // Center square (index 4) never moves
  right =>  // Corner squares: 0,2,6,8
  up  =>    // Edge squares: 1,3,5,7
  down => []
}

\`\`\`

#### Face Rotation Mathematics
\`\`\`javascript
// 90° Clockwise Rotation Mapping
private rotateFaceClockwise(face) {
  const newFace = [...face]
  newFace[0] = face[6]  // Top-left ← Bottom-left
  newFace[1] = face[3]  // Top-center ← Middle-left
  newFace[2] = face[0]  // Top-right ← Top-left
  newFace[3] = face[7]  // Middle-right ← Bottom-center
  newFace[4] = face[4]  // Center stays (invariant)
  newFace[5] = face[1]  // Middle-right ← Top-center
  newFace[6] = face[8]  // Bottom-left ← Bottom-right
  newFace[7] = face[5]  // Bottom-center ← Middle-right
  newFace[8] = face[2]  // Bottom-right ← Top-right
  return newFace
}
\`\`\`


#### State Management
- **Immutable Updates**: Prevents accidental state mutations
- **Deep Cloning**: Ensures solver doesn't affect original cube
- **Efficient Copying**: JSON serialization for state snapshots
- **Memory Management**: Minimal object creation during rotations

#### Rendering Optimizations
- **SVG Generation**: Vector graphics for crisp display at any size
- **Component Memoization**: Prevents unnecessary re-renders
- **Lazy Loading**: Components load only when needed
- **Responsive Design**: Tailwind CSS for efficient styling

### State consistency checks
public validateState(): boolean {
  // Ensure 54 squares total
  // Verify color distribution
  // Check face integrity
}
\`\`\`

#### Graceful Degradation
- **Algorithm Fallbacks**: Multiple solving approaches
- **Error Recovery**: Reset to known good state
- **User Feedback**: Clear error messages and guidance
- **Progressive Enhancement**: Works without JavaScript (basic display)


### Algorithm Performance
- **Average Solve Time**: 50-100 moves
- **Scramble Complexity**: 20 random moves
- **State Space**: 43,252,003,274,489,856,000 possible configurations
- **Solvable States**: All generated scrambles are guaranteed solvable


## 🐛 Known Issues

### Current Limitations
- **Algorithm Efficiency**: Not optimized for minimum moves
- **Pattern Recognition**: Limited cube state analysis
- **Mobile Performance**: May be slow on older devices
- **Browser Compatibility**: Requires modern browser features

---
---

<div align="center">

**⭐ Star this repository if you found it helpful!**
</div>
