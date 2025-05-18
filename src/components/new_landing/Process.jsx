const Process = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full font-inter rounded-[3rem]">
      <div className="w-11/12 mx-auto flex flex-col items-center justify-center bg-[#f7f7f9] font-inter pt-16 pb-12 rounded-[3rem]">
        <div className="text-center mb-10">
          <div className="flex w-fit mx-auto items-center justify-center mb-2 bg-white py-2 px-4 rounded-xl">
            <img
              className="size-5 mr-2"
              src="/LimeblockLogo.png"
              alt="Limeblock Logo"
            />
            <span className="text-sm font-medium">How Limeblock Works</span>
          </div>
          <h1 className="text-5xl font-medium font-aeonik text-gray-900 mt-8">
            A Simple but Powerful Flow
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Easy to use, easy to understand, and easy to implement.
          </p>
        </div>
        <img
          className="w-4/5 h-full pl-8"
          src="/LimeblockProcess.png"
          alt="Process"
        />
      </div>
    </div>
  );
};

export default Process;
