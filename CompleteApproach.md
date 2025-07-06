# Guide: Rubik's Cube Solver

## Table of Contents
1. [Opening Statement](#opening-statement)
2. [Technical Architecture](#technical-architecture)
3. [Cube Representation](#cube-representation)
4. [Rotation Algorithm](#rotation-algorithm)
5. [Solving Strategy](#solving-strategy)
6. [Code Architecture](#code-architecture)
7. [React Components](#react-components)
8. [Technical Challenges](#technical-challenges)
9. [Performance & Testing](#performance-testing)

---

## Opening Statement (2-3 minutes)

"I'd like to walk you through my Rubik's Cube Solver project, which demonstrates my skills in algorithm design, object-oriented programming, and React development. This project tackles a complex 3D mathematical problem and presents it through an intuitive web interface. Let me break down my approach step by step."

---

## Technical Architecture

### System Overview Diagram
\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    RUBIK'S CUBE SOLVER                      │
├─────────────────────────────────────────────────────────────┤
│  USER INTERFACE (React Components)                          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│  │ CubeDisplay │ │CubeControls │ │ StepDisplay │            │
│  │   (SVG)     │ │  (Buttons)  │ │(Navigation) │            │
│  └─────────────┘ └─────────────┘ └─────────────┘            │
├─────────────────────────────────────────────────────────────┤
│  BUSINESS LOGIC (JavaScript Classes)                        │
│  ┌─────────────┐           ┌─────────────┐                 │
│  │ RubiksCube  │◄─────────►│ CubeSolver  │                 │
│  │   Class     │           │    Class    │                 │
│  └─────────────┘           └─────────────┘                 │
├─────────────────────────────────────────────────────────────┤
│  DATA LAYER (State Management)                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │     6 Faces × 9 Squares = 54 Total Positions           ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘

**Key Points:**
- Three-layer architecture separating UI, business logic, and data
- Ensures maintainability and testability of each component
- Cube state is completely isolated from the presentation layer

---

## Cube Representation Deep Dive

### 3D Cube Mapping
\`\`\`
                    ┌─────────────┐
                    │  UP FACE    │
                    │ [0][1][2]   │
                    │ [3][4][5]   │
                    │ [6][7][8]   │
┌─────────────┬─────────────┬─────────────┬─────────────┐
│  LEFT FACE  │ FRONT FACE  │ RIGHT FACE  │ BACK FACE   │
│ [0][1][2]   │ [0][1][2]   │ [0][1][2]   │ [0][1][2]   │
│ [3][4][5]   │ [3][4][5]   │ [3][4][5]   │ [3][4][5]   │
│ [6][7][8]   │ [6][7][8]   │ [6][7][8]   │ [6][7][8]   │
└─────────────┴─────────────┴─────────────┴─────────────┘
                    │ DOWN FACE   │
                    │ [0][1][2]   │
                    │ [3][4][5]   │
                    │ [6][7][8]   │
                    └─────────────┘
\`\`\`

### Cube State
\`\`\`javascript
oject CubeState = {
  front: Color[9],   // Green squares
  back: Color[9],    // Blue squares
  left: Color[9],    // Orange squares
  right: Color[9],   // Red squares
  up: Color[9],      // White squares
  down: Color[9]     // Yellow squares
}
\`\`\`

**Key Points:**
- Cube represented as 6 faces, each with 9 indexed squares
- Unfolded view helps visualize how rotations affect adjacent faces
- Each square has a fixed index, making rotations mathematically predictable

---

## Rotation Algorithm Explanation

### Face Rotation Mathematics
\`\`\`
CLOCKWISE ROTATION TRANSFORMATION:

Before Rotation:        After Rotation:
┌─────┬─────┬─────┐    ┌─────┬─────┬─────┐
│  0  │  1  │  2  │    │  6  │  3  │  0  │
├─────┼─────┼─────┤    ├─────┼─────┼─────┤
│  3  │  4  │  5  │ => │  7  │  4  │  1  │
├─────┼─────┼─────┤    ├─────┼─────┼─────┤
│  6  │  7  │  8  │    │  8  │  5  │  2  │
└─────┴─────┴─────┘    └─────┴─────┴─────┘

MAPPING LOGIC:
newFace[0] = face[6]  // Top-left ← Bottom-left
newFace[1] = face[3]  // Top-center ← Middle-left
newFace[2] = face[0]  // Top-right ← Top-left
newFace[3] = face[7]  // Middle-left ← Bottom-center
newFace[4] = face[4]  // Center stays (invariant)
newFace[5] = face[1]  // Middle-right ← Top-center
newFace[6] = face[8]  // Bottom-left ← Bottom-right
newFace[7] = face[5]  // Bottom-center ← Middle-right
newFace[8] = face[2]  // Bottom-right ← Top-right
\`\`\`

### Adjacent Face Movement (F Rotation Example)
\`\`\`
F ROTATION - ADJACENT EDGE MOVEMENT:

                    ┌─────────────┐
                    │    UP       │
                    │ [ ][ ][ ]   │
                    │ [ ][4][ ]   │
                    │ [6][7][8]   │ ← These move to RIGHT
                    └─────────────┘
┌─────────────┬─────────────┬─────────────┐
│    LEFT     │   FRONT     │   RIGHT     │
│ [ ][ ][2]   │ ┌─────────┐ │ [0][ ][ ]   │
│ [ ][4][5] ← │ │ROTATES  │ │ [3][4][ ]   │
│ [ ][ ][8]   │ │CLOCKWISE│ │ [6][ ][ ]   │
└─────────────┤ └─────────┘ ├─────────────┘
              │             │ ↓ These move to DOWN
              └─────────────┘
                    ┌─────────────┐
                    │   DOWN      │
                    │ [0][1][2]   │ ← These come from RIGHT
                    │ [ ][4][ ]   │
                    │ [ ][ ][ ]   │
                    └─────────────┘

EDGE MOVEMENT CYCLE:
UP[6,7,8] → RIGHT[0,3,6] → DOWN[2,1,0] → LEFT[8,5,2] → UP[6,7,8]
\`\`\`

**Key Points:**
- Each rotation follows a mathematical pattern - 90° clockwise transformation
- Center square (index 4) never moves, crucial for cube logic
- Each face rotation affects 4 adjacent faces in a specific pattern
- Careful tracking of edge movements, including reversals

---

## Solving Algorithm Strategy

### Layer-by-Layer Method
\`\`\`
SOLVING PHASES:

Phase 1: WHITE CROSS          Phase 2: WHITE CORNERS
┌─────────────┐              ┌─────────────┐
│ [ ][W][ ]   │              │ [W][W][W]   │
│ [W][W][W]   │              │ [W][W][W]   │
│ [ ][W][ ]   │              │ [W][W][W]   │
└─────────────┘              └─────────────┘

Phase 3: MIDDLE LAYER        Phase 4: YELLOW CROSS
┌─────────────┐              ┌─────────────┐
│ [W][W][W]   │              │ [ ][Y][ ]   │
│ [*][*][*]   │ ← Solve      │ [Y][Y][Y]   │
│ [ ][ ][ ]   │   these      │ [ ][Y][ ]   │
└─────────────┘              └─────────────┘

Phase 5-7: YELLOW LAYER COMPLETION
┌─────────────┐
│ [Y][Y][Y]   │
│ [Y][Y][Y]   │ ← Final goal
│ [Y][Y][Y]   │
└─────────────┘

ALGORITHM COMPLEXITY:
• Average: 50-120 moves
• Time: O(n) where n = moves
• Space: O(1) for state storage
\`\`\`

**Key Points:**
- Chose beginner-friendly layer-by-layer method for reliability
- Each phase has specific algorithms (e.g., Sune algorithm for corners)
- Approach prioritizes correctness over optimization

---

## Code Architecture Deep Dive

### Class Structure
\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    RubiksCube Class                         │
├─────────────────────────────────────────────────────────────┤
│  PRIVATE STATE:                                             │
│  • state: CubeState (6 faces × 9 squares)                  │
│                                                             │
│  PUBLIC METHODS:                                            │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │ ROTATION METHODS│  │ UTILITY METHODS │                  │
│  │ • rotateF()     │  │ • scramble()    │                  │
│  │ • rotateFPrime()│  │ • isSolved()    │                  │
│  │ • rotateR()     │  │ • reset()       │                  │
│  │ • rotateRPrime()│  │ • executeMove() │                  │
│  │ • rotateU()     │  │ • validateState()│                  │
│  │ • rotateUPrime()│  │ • getStatistics()│                  │
│  │ • rotateL()     │  │                 │                  │
│  │ • rotateLPrime()│  │                 │                  │
│  │ • rotateD()     │  │                 │                  │
│  │ • rotateDPrime()│  │                 │                  │
│  │ • rotateB()     │  │                 │                  │
│  │ • rotateBPrime()│  │                 │                  │
│  └─────────────────┘  └─────────────────┘                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    CubeSolver Class                         │
├─────────────────────────────────────────────────────────────┤
│  PRIVATE METHODS:                                           │
│  • solveWhiteCross()     • orientYellowCorners()           │
│  • solveWhiteCorners()   • permuteYellowCorners()          │
│  • solveMiddleLayer()    • permuteYellowEdges()            │
│  • solveYellowCross()    • executeAlgorithm()              │
│                                                             │
│  PUBLIC METHODS:                                            │
│  • solve()  • getSteps()     │
└─────────────────────────────────────────────────────────────┘
\`\`\`

**Key Points:**
- Object-oriented design with clear separation of concerns
- RubiksCube class handles state, CubeSolver handles algorithms
- Each method has single responsibility and is thoroughly tested

---

## React Component Architecture

### Component Hierarchy
\`\`\`
                    ┌─────────────┐
                    │     App     │
                    │ (Main State)│
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────|──────────────────
        │                  │                  │
   ┌────▼────┐       ┌─────▼─────┐      ┌────▼────┐          ────────────
   │Cube     │       │   Cube    │      │  Step   │          │  Heading  │
   │Display  │       │ Controls  │      │ Display │          │ ───────── │
   │Display  │       │ Controls  │      │ Display │
   └─────────┘       └───────────┘      └─────────┘
        │                  │                  │
   ┌────▼────┐       ┌─────▼─────┐      ┌────▼────┐
   │getCubeSvg│      │ Manual     │     │ Solution │
   │ Utility  │      │Rotation   │     │ Steps    │
   └─────────┘       │Buttons    │      │ Navigator│
                     └───────────┘      └─────────┘

DATA FLOW:
App State ──► Components (Props)
Components ──► App (Callbacks)
Cube State ──► SVG Rendering
User Actions ──► State Updates
\`\`\`

**Key Points:**
- React hooks for state management with unidirectional data flow
- Each component has specific purpose and receives data via props
- State updates trigger re-renders only where necessary

---

## Technical Challenges & Solutions

### Challenge 1: Complex State Management
\`\`\`
PROBLEM: Managing 54 squares across 6 faces with complex interdependencies

SOLUTION:
┌─────────────────────────────────────────────────────────────┐
│  IMMUTABLE STATE UPDATES                                    │
│  ┌─────────────────┐    ┌─────────────────┐                │
│  │  Current State  │    │   New State     │                │
│  │     (Copy)      │───►│   (Modified)    │                │
│  └─────────────────┘    └─────────────────┘                │
│                                                             │
│  • JSON.parse(JSON.stringify()) for deep copying           │
│  • Validation after each move                               │
│  • Rollback capability for invalid states                  │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Challenge 2: Edge Movement Complexity
\`\`\`
PROBLEM: Tracking which squares move where during rotations

SOLUTION:
┌─────────────────────────────────────────────────────────────┐
│  SYSTEMATIC MAPPING APPROACH                                │
│                                                             │
│  1. Document each rotation with diagrams                    │
│  2. Create temporary variables for edge storage             │
│  3. Apply movements in correct sequence                     │
│  4. Test with known cube states                             │
│                                                             │
│  Example: F Rotation                                        │
│  temp = UP[6,7,8]                                          │
│  UP[6,7,8] ← LEFT[8,5,2]                                   │
│  LEFT[2,5,8] ← DOWN[0,1,2]                                 │
│  DOWN[0,1,2] ← RIGHT[6,3,0]                                │
│  RIGHT[0,3,6] ← temp                                        │
└─────────────────────────────────────────────────────────────┘
\`\`\`

**Key Points:**
- Biggest challenge was ensuring rotation accuracy
- Solved through systematic documentation and extensive testing
- Each rotation method went through multiple iterations

---

\`\`\`

---

## Project Impact & Results

### Quantifiable Achievements
- **100% solve success rate** for all generated scrambles
- **Mobile responsive** design working on all devices
- **Comprehensive test coverage** with 95%+ code coverage

### Skills Demonstrated
- **Problem-solving**: Complex 3D mathematical algorithms
- **Architecture**: Clean, maintainable code structure
- **User Experience**: Intuitive interface design

### Technologies Used
- **Frontend**: React 18, Tailwind CSS , W3School <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
</svg>

- **Build Tools**: Vite, npm, ESLint, Prettier
- **Deployment**: Vercel, GitHub
- **Development**: Object-Oriented Programming, Algorithm Design

---

## 💡 Key Learning Outcomes

### Technical Skills Developed
\`\`\`
┌─────────────────────────────────────────────────────────────┐
│  ALGORITHM DESIGN                                           │
│  • Complex state management                                 │
│  • Mathematical problem solving                             │
│  • Performance optimization                                 │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  REACT MASTERY                                              │
│  • Advanced hooks usage                                     │
│  • Component architecture                                   │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  SOFTWARE ENGINEERING                                       │
│  • Object-oriented design                                   │
│  • Documentation practices                                  │
└─────────────────────────────────────────────────────────────┘
\`\`\`
---
