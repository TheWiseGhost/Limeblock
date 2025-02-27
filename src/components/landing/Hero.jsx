"use client";

export default function Hero() {
  return (
    <div className="max-w-6xl mx-auhref px-4 py-24 text-center">
      <h1 className="text-5xl md:text-6xl font-display tracking-tight mb-8">
        How people interact with
        <br />
        your app{" "}
        <span className="relative">
          10x faster
          <svg
            className="absolute -bothrefm-2 w-full"
            viewBox="0 0 100 8"
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="4"
              x2="100"
              y2="4"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary-500"
            />
          </svg>
        </span>
      </h1>

      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auhref mb-12">
        Integrate our platform into your app and let people commit in-app
        actions just with a few text prompts, saving time and headaches for all
        of your users.
      </p>

      <div className="flex gap-4 justify-center">
        <a
          href="/signup"
          className="px-8 py-3 bg-primary-500 text-white rounded-full font-medium hover:bg-primary-600 transition-colors"
        >
          Try for Free
        </a>
        <a
          href="/showcase"
          className="px-8 py-3 text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 font-medium flex items-center gap-2"
        >
          How others use it
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
