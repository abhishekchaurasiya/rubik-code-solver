const AlgoInfo = () => {
  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Algorithm Info</h3>
      <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
        <div>
          <h4 className=" capitalize">Solving method: layer-by-layer</h4>
          <ul className=" space-y-2 capitalize">
            <li>1. White cross formation</li>
            <li>2. White corner positioning</li>
            <li>3. Middle layer edge solving</li>
            <li>4. Yellow cross formation</li>
            <li>5. Yellow corner orientation</li>
            <li>6. Yellow corner permutation </li>
            <li>7. Yellow edge permutation</li>
          </ul>
        </div>
        <div>
          <h4 className=" font-semibold mb-3 mt-3">Move Notation</h4>
          <ul className=" space-y-2 capitalize">
            <li>
              {" "}
              <strong>f/b:</strong> Front / back face clockwise
            </li>
            <li>
              {" "}
              <strong>r/l:</strong> Right / Left face clockwise
            </li>
            <li>
              {" "}
              <strong>u/d:</strong> up / down face clockwise
            </li>
            <li>
              {" "}
              <strong>'':</strong> counterclockwise rotation
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlgoInfo;
