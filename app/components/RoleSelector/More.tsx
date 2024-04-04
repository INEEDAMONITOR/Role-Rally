export const More = () => {
  return (
    <button className="p-2 px-3 rounded-2xl hover:bg-zinc-700">
      <div className="flex flex-col items-center text-xs text-gray-300 hover:text-gray-200">
        <div>
          <svg
            className="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="M6 12h.01m6 0h.01m5.99 0h.01"
            />
          </svg>
        </div>
        <div>
          More
        </div>
      </div>
    </button>
  );
};
