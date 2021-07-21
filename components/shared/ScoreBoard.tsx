const ScoreBoard = ({ isCompleted, isFirstPlayerTurn, winner }) => (
  <div className="mx-auto w-[500px] flex flex-wrap justify-between items-center p-4 border border-gray-800 rounded-md m-4">
    <div className="flex justify-start items-center">
      <div
        className={`w-[15px] h-[15px] rounded-full mr-2 ${
          isCompleted ? "bg-yellow-300" : "bg-green-300"
        }`}
      />
      {isCompleted ? (
        <p className="text-yellow-300 font-bold">Complete</p>
      ) : (
        <p className="text-green-300 font-bold">Going</p>
      )}
    </div>
    {isCompleted ? null : isFirstPlayerTurn ? (
      <p className="text-blue-400">1st Player turn (X)</p>
    ) : (
      <p className="text-red-400">2nd Player turn (O)</p>
    )}
    {isCompleted ? (
      winner === 1 ? (
        <p className="text-blue-400 font-black">1st PLayer Wins (X)</p>
      ) : winner === 2 ? (
        <p className="text-red-400 font-black">2nd PLayer Wins (O)</p>
      ) : (
        <p className="text-green-400 font-black">Tie</p>
      )
    ) : null}
  </div>
);

export default ScoreBoard;
