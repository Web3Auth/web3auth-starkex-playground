const Console = () => {
  return (
    <div className="flex-col w-full">
      <h1 className="flex justify-center md:items-center items-center font-medium leading-tight text-3xl mt-0 mb-2 text-slate-600">Response</h1>
      <div className="justify-center w-full">
        <div className="md:flex md:items-center p-4 m-4 bg-gray-200" id="console">
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default Console;
