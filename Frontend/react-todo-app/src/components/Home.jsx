export default function Home() {
  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to ToDoChecker v0.1</h1>
      <p className="text-lg text-gray-600 leading-relaxed">
        This is a short summary of the app and how to use it. Currently you are looking at the frontend that was made using 
        React with Vite and Tailwind for css. There is also an API .NET Core backend.
      </p>
      <p className="text-lg text-gray-600 leading-relaxed">
        The source code is on https://github.com/mPunc/ToDoChecker
      </p>
      <p className="text-lg text-gray-600 leading-relaxed">
        You can also use Docker to pull the image, use this command:
      </p>
      <p className="text-lg text-gray-600 leading-relaxed">
        docker run -p 5001:5000 --name todo-api-container mpunch46/todo-api:latest
      </p>
      <p className="text-lg text-gray-600 leading-relaxed">
        You have to have the API running in the backend, the ports are fixed on the frontend so I recommend using Docker.
        After that, go to Controls and press Generate XML to create the XML document where the data will be stored, you should only need to do this step once.
        After that, run the API container in the background to use the app locally. All API routes should be functional.
      </p>
    </div>
  );
}
