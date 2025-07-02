import { getCubeSvg } from "../lib/CubeSvg";

const CubeDisplay = ({ cubeState, className = "" }) => {
  const svgString = getCubeSvg(cubeState);

  return (
    <div className={`${className} flex justify-center items-center`}>
      <div
        className=" border-2 border-slate-300 rounded-lg p-4 bg-white shadow-lg"
        dangerouslySetInnerHTML={{ __html: svgString }}
      />
    </div>
  );
};
export default CubeDisplay;
