import loading from "../assets/loading.jpg";

const Loading = () => {
  return (
    <main className="w-screen h-screen bg-blue-950">
      <div className="w-full h-full flex justify-center items-center flex-col">
        <img
          className="w-[30%] object-cover rounded-[50%] transition-opacity animate-pulse duration-300"
          src={loading}
          alt="irunga bhai"
        />
      </div>
    </main>
  );
};

export default Loading;
