import { Database, Layout, Code, FileJson } from "lucide-react";

export default function ThreeStepProcess() {
  return (
    <div className="w-full bg-white min-h-screen flex flex-col items-center justify-center p-4 font-inter rounded-t-[3rem] pt-12">
      {/* Logo and heading */}
      <div className="text-center mb-16">
        <div className="flex w-fit mx-auto items-center justify-center mb-2 bg-gray-100 py-2 px-4 rounded-xl">
          <img className="size-5 mr-2" src="/LimeblockLogo.png" />
          <span className="text-sm font-medium">Meet Limeblock</span>
        </div>
        <h1 className="text-5xl font-medium font-aeonik text-gray-900 mt-8">
          Just add pages, endpoints, schemas.
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Build a chat widget that does the same thing production-grade ai tools
          for your app in minutes with Limeblock's intuitive three-step process
        </p>
      </div>

      {/* Three step process */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Step 1: Add Pages */}
        <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
          <div className="flex items-center mb-4">
            <Layout className="text-lime-600 mr-3" size={24} />
            <h2 className="text-xl font-semibold">Step 1: Add Pages</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Design beautiful interfaces with our drag-and-drop editor or let
            Limeblock generate pages from your data.
          </p>

          <div className="border border-gray-200 bg-white rounded-lg p-4">
            <code className="text-sm text-gray-700 block">
              <span className="text-purple-600">const</span>{" "}
              <span className="text-blue-600">DashboardPage</span> = () =&gt;{" "}
              {"{"}
              <br />
              &nbsp;&nbsp;<span className="text-purple-600">return</span> (
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;
              <span className="text-green-600">Dashboard</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-orange-600">title</span>=
              <span className="text-green-600">"User Analytics"</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-orange-600">layout</span>=
              <span className="text-green-600">"grid"</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;/&gt;
              <br />
              &nbsp;&nbsp;);
              <br />
              {"}"};
            </code>
          </div>
        </div>

        {/* Step 2: Add Endpoints */}
        <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
          <div className="flex items-center mb-4">
            <Code className="text-lime-600 mr-3" size={24} />
            <h2 className="text-xl font-semibold">Step 2: Add Endpoints</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Connect your databases and APIs or create new endpoints to power
            your application's functionality.
          </p>

          <div className="border border-gray-200 bg-white rounded-lg p-4">
            <code className="text-sm text-gray-700 block">
              <span className="text-purple-600">export async function</span>{" "}
              <span className="text-blue-600">getUsers</span>() {"{"}
              <br />
              &nbsp;&nbsp;<span className="text-purple-600">const</span>{" "}
              <span className="text-blue-600">users</span> ={" "}
              <span className="text-purple-600">await</span> db.users.findMany(
              {"{"}
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-orange-600">where</span>: {"{"}{" "}
              <span className="text-orange-600">active</span>:{" "}
              <span className="text-purple-600">true</span> {"}"}
              <br />
              &nbsp;&nbsp;{"}"});
              <br />
              &nbsp;&nbsp;<span className="text-purple-600">return</span> {"{"}{" "}
              <span className="text-orange-600">users</span> {"}"};
              <br />
              {"}"}
            </code>
          </div>
        </div>

        {/* Step 3: Add Schema */}
        <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
          <div className="flex items-center mb-4">
            <FileJson className="text-lime-600 mr-3" size={24} />
            <h2 className="text-xl font-semibold">Step 3: Add Schema</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Define your data models and relationships to ensure type safety and
            enable powerful auto-generation features.
          </p>

          <div className="border border-gray-200 bg-white rounded-lg p-4">
            <code className="text-sm text-gray-700 block">
              <span className="text-purple-600">const</span>{" "}
              <span className="text-blue-600">UserSchema</span> = {"{"}
              <br />
              &nbsp;&nbsp;<span className="text-orange-600">id</span>:{" "}
              <span className="text-green-600">"string"</span>,
              <br />
              &nbsp;&nbsp;<span className="text-orange-600">name</span>:{" "}
              <span className="text-green-600">"string"</span>,
              <br />
              &nbsp;&nbsp;<span className="text-orange-600">email</span>:{" "}
              <span className="text-green-600">"string"</span>,
              <br />
              &nbsp;&nbsp;<span className="text-orange-600">role</span>: {"{"}
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-orange-600">type</span>:{" "}
              <span className="text-green-600">"enum"</span>,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-orange-600">values</span>: [
              <span className="text-green-600">"admin"</span>,{" "}
              <span className="text-green-600">"user"</span>]
              <br />
              &nbsp;&nbsp;{"}"}
              <br />
              {"}"};
            </code>
          </div>
        </div>
      </div>

      {/* Call to action button */}
      <div className="mt-12">
        <button className="bg-lime-500 hover:bg-lime-600 text-white font-medium py-3 px-8 rounded-lg shadow-sm transition-colors">
          Get Started with Limeblock
        </button>
      </div>
    </div>
  );
}
