const OperationButtons = ({
  addSubOrder,
  removeActiveSubOrder,
  clearTable,
}) => {
  return (
    <div className="flex justify-around">
      <div className="flex flex-col">
        <button
          className="py-2 px-6 rounded border bg-blue-200"
          onClick={addSubOrder}
        >
          + Person
        </button>

        <button
          className="mt-4 py-2 px-6 rounded border bg-blue-200"
          onClick={removeActiveSubOrder}
        >
          - Person
        </button>
      </div>

      <button
        className="px-8 py-2 border rounded bg-red-200"
        onClick={clearTable}
      >
        Fertig
      </button>
    </div>
  )
}

export default OperationButtons
