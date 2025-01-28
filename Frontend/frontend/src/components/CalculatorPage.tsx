
// import React, { useState } from "react";

// Addition Component
const Addition: React.FC = () => {
  const [num1, setNum1] = useState<number | string>("");
  const [num2, setNum2] = useState<number | string>("");
  const [result, setResult] = useState<number | string>("");

  const handleAddition = () => {
    if (num1 !== "" && num2 !== "") {
      setResult(Number(num1) + Number(num2));
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 p-6 rounded-lg shadow-xl w-full h-64 flex flex-col justify-between">
      <div className="text-white font-semibold text-lg">Addition</div>
      <div className="mt-4">
        <input
          type="number"
          className="p-2 border-none rounded w-full mb-4"
          placeholder="Enter first number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
        />
        <input
          type="number"
          className="p-2 border-none rounded w-full mb-4"
          placeholder="Enter second number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
        />
        <button
          onClick={handleAddition}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Add
        </button>
        {result !== "" && (
          <div className="mt-4 text-white text-xl">
            Result: {result}
          </div>
        )}
      </div>
    </div>
  );
};

// Subtraction Component
const Subtraction: React.FC = () => {
  const [num1, setNum1] = useState<number | string>("");
  const [num2, setNum2] = useState<number | string>("");
  const [result, setResult] = useState<number | string>("");

  const handleSubtraction = () => {
    if (num1 !== "" && num2 !== "") {
      setResult(Number(num1) - Number(num2));
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 p-6 rounded-lg shadow-xl w-full h-64 flex flex-col justify-between">
      <div className="text-white font-semibold text-lg">Subtraction</div>
      <div className="mt-4">
        <input
          type="number"
          className="p-2 border-none rounded w-full mb-4"
          placeholder="Enter first number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
        />
        <input
          type="number"
          className="p-2 border-none rounded w-full mb-4"
          placeholder="Enter second number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
        />
        <button
          onClick={handleSubtraction}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Subtract
        </button>
        {result !== "" && (
          <div className="mt-4 text-white text-xl">
            Result: {result}
          </div>
        )}
      </div>
    </div>
  );
};

// Multiply Component
const Multiply: React.FC = () => {
  const [num1, setNum1] = useState<number | string>("");
  const [num2, setNum2] = useState<number | string>("");
  const [result, setResult] = useState<number | string>("");

  const handleMultiply = () => {
    if (num1 !== "" && num2 !== "") {
      setResult(Number(num1) * Number(num2));
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 p-6 rounded-lg shadow-xl w-full h-64 flex flex-col justify-between">
      <div className="text-white font-semibold text-lg">Multiply</div>
      <div className="mt-4">
        <input
          type="number"
          className="p-2 border-none rounded w-full mb-4"
          placeholder="Enter first number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
        />
        <input
          type="number"
          className="p-2 border-none rounded w-full mb-4"
          placeholder="Enter second number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
        />
        <button
          onClick={handleMultiply}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Multiply
        </button>
        {result !== "" && (
          <div className="mt-4 text-white text-xl">
            Result: {result}
          </div>
        )}
      </div>
    </div>
  );
};

// Divide Component
const Divide: React.FC = () => {
  const [num1, setNum1] = useState<number | string>("");
  const [num2, setNum2] = useState<number | string>("");
  const [result, setResult] = useState<number | string>("");

  const handleDivide = () => {
    if (num1 !== "" && num2 !== "") {
      if (num2 === "0") {
        setResult("Cannot divide by 0");
      } else {
        setResult(Number(num1) / Number(num2));
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 p-6 rounded-lg shadow-xl w-full h-64 flex flex-col justify-between">
      <div className="text-white font-semibold text-lg">Divide</div>
      <div className="mt-4">
        <input
          type="number"
          className="p-2 border-none rounded w-full mb-4"
          placeholder="Enter first number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
        />
        <input
          type="number"
          className="p-2 border-none rounded w-full mb-4"
          placeholder="Enter second number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
        />
        <button
          onClick={handleDivide}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Divide
        </button>
        {result !== "" && (
          <div className="mt-4 text-white text-xl">
            Result: {result}
          </div>
        )}
      </div>
    </div>
  );
};

// // Box Component
// const CalculatorBox: React.FC<{ operation: string; onClick: () => void }> = ({
//   operation,
//   onClick,
// }) => {
//   return (
//     <div
//       onClick={onClick}
//       className="bg-gradient-to-r from-indigo-700 to-indigo-500 p-6 rounded-lg shadow-xl cursor-pointer flex justify-center items-center text-white text-lg"
//     >
//       {operation} Box
//     </div>
//   );
// };

// // Main Page Component
// const CalculatorPage: React.FC = () => {
//   const [selectedOperation, setSelectedOperation] = useState<string | null>(null);

//   const handleBoxClick = (operation: string) => {
//     setSelectedOperation(operation);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="grid grid-cols-4 gap-8 mb-8">
//         {["Add", "Subtract", "Multiply", "Divide"].map((operation) => (
//           <CalculatorBox
//             key={operation}
//             operation={operation}
//             onClick={() => handleBoxClick(operation)}
//           />
//         ))}
//       </div>

//       {selectedOperation === "Add" && <Addition />}
//       {selectedOperation === "Subtract" && <Subtraction />}
//       {selectedOperation === "Multiply" && <Multiply />}
//       {selectedOperation === "Divide" && <Divide />}
//     </div>
//   );
// };

// export default CalculatorPage;
import React, { useState } from "react";

// Profit Component
const Profit: React.FC = () => {
  const [costPrice, setCostPrice] = useState<number | string>("");
  const [sellingPrice, setSellingPrice] = useState<number | string>("");
  const [profit, setProfit] = useState<number | string>("");

  const handleProfit = () => {
    if (costPrice !== "" && sellingPrice !== "") {
      setProfit(Number(sellingPrice) - Number(costPrice));
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 p-6 rounded-lg shadow-xl w-full h-64 flex flex-col justify-between">
      <div className="text-white font-semibold text-lg">Profit Calculation</div>
      <div className="mt-4">
        <input
          type="number"
          className="p-2 border-none rounded w-full mb-4"
          placeholder="Enter cost price"
          value={costPrice}
          onChange={(e) => setCostPrice(e.target.value)}
        />
        <input
          type="number"
          className="p-2 border-none rounded w-full mb-4"
          placeholder="Enter selling price"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
        />
        <button
          onClick={handleProfit}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Calculate Profit
        </button>
        {profit !== "" && (
          <div className="mt-4 text-white text-xl">
            Profit: {profit}
          </div>
        )}
      </div>
    </div>
  );
};

// Percentage Component
const Percentage: React.FC = () => {
  const [total, setTotal] = useState<number | string>("");
  const [percent, setPercent] = useState<number | string>("");
  const [result, setResult] = useState<number | string>("");

  const handlePercentage = () => {
    if (total !== "" && percent !== "") {
      setResult((Number(total) * Number(percent)) / 100);
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 p-6 rounded-lg shadow-xl w-full h-64 flex flex-col justify-between">
      <div className="text-white font-semibold text-lg">Percentage Calculation</div>
      <div className="mt-4">
        <input
          type="number"
          className="p-2 border-none rounded w-full mb-4"
          placeholder="Enter total amount"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
        />
        <input
          type="number"
          className="p-2 border-none rounded w-full mb-4"
          placeholder="Enter percentage"
          value={percent}
          onChange={(e) => setPercent(e.target.value)}
        />
        <button
          onClick={handlePercentage}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Calculate Percentage
        </button>
        {result !== "" && (
          <div className="mt-4 text-white text-xl">
            Result: {result}
          </div>
        )}
      </div>
    </div>
  );
};

// Man Calculation Component
const ManCalculation: React.FC = () => {
  const [taskDuration, setTaskDuration] = useState<number | string>("");
  const [workers, setWorkers] = useState<number | string>("");
  const [result, setResult] = useState<number | string>("");

  const handleManCalculation = () => {
    if (taskDuration !== "" && workers !== "") {
      setResult((Number(taskDuration) * Number(workers)).toString());
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 p-6 rounded-lg shadow-xl w-full h-64 flex flex-col justify-between">
      <div className="text-white font-semibold text-lg">Man Calculation</div>
      <div className="mt-4">
        <input
          type="number"
          className="p-2 border-none rounded w-full mb-4"
          placeholder="Enter task duration (days)"
          value={taskDuration}
          onChange={(e) => setTaskDuration(e.target.value)}
        />
        <input
          type="number"
          className="p-2 border-none rounded w-full mb-4"
          placeholder="Enter number of workers"
          value={workers}
          onChange={(e) => setWorkers(e.target.value)}
        />
        <button
          onClick={handleManCalculation}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Calculate Total Man-Days
        </button>
        {result !== "" && (
          <div className="mt-4 text-white text-xl">
            Total Man-Days: {result}
          </div>
        )}
      </div>
    </div>
  );
};

// Box Component
const CalculatorBox: React.FC<{ operation: string; onClick: () => void }> = ({
  operation,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-gradient-to-r from-indigo-700 to-indigo-500 p-6 rounded-lg shadow-xl cursor-pointer flex justify-center items-center text-white text-lg"
    >
      {operation} Box
    </div>
  );
};

// Main Page Component
const CalculatorPage: React.FC = () => {
  const [selectedOperation, setSelectedOperation] = useState<string | null>(null);

  const handleBoxClick = (operation: string) => {
    setSelectedOperation(operation);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="grid grid-cols-4 gap-8 mb-8">
        {["Add", "Subtract", "Multiply", "Divide", "Profit", "Percentage", "Man Calculation"].map((operation) => (
          <CalculatorBox
            key={operation}
            operation={operation}
            onClick={() => handleBoxClick(operation)}
          />
        ))}
      </div>

      {selectedOperation === "Add" && <Addition />}
      {selectedOperation === "Subtract" && <Subtraction />}
      {selectedOperation === "Multiply" && <Multiply />}
      {selectedOperation === "Divide" && <Divide />}
      {selectedOperation === "Profit" && <Profit />}
      {selectedOperation === "Percentage" && <Percentage />}
      {selectedOperation === "Man Calculation" && <ManCalculation />}
    </div>
  );
};

export default CalculatorPage;
