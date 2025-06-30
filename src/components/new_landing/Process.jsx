const Process = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full font-inter rounded-[3rem]">
      <div className="w-full md:w-11/12 flex flex-col items-center justify-center bg-[#f7f7f9] font-inter pt-16 pb-12 rounded-[3rem] px-4 md:px-0 mx-2 md:mx-auto">
        <div className="text-center mb-10">
          <div className="flex w-fit mx-auto items-center justify-center mb-2 bg-white py-2 px-4 rounded-xl">
            <img
              className="size-5 mr-2"
              src="/LimeblockLogo.png"
              alt="Limeblock Logo"
            />
            <span className="text-sm font-medium">How Limeblock Works</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-medium font-aeonik text-gray-900 mt-8">
            A Simple but <br className="block md:hidden" /> Powerful Flow
          </h1>
          <p className="text-gray-600 mt-4 text-sm md:text-base max-w-2xl mx-auto">
            Easy to use, easy to understand, and easy to implement.
          </p>
        </div>
        <img
          className="w-full md:w-4/5 h-full pl-0 md:pl-8"
          src="/LimeblockProcess.png"
          alt="Process"
        />
      </div>
    </div>
  );
};

export default Process;
