export default function Home() {
  return (
    <div className="max-w-4xl mx-auto mt-6 px-4">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">Welcome to ToDoChecker v0.2</h1>
      <p className="text-md text-gray-800 leading-relaxed">
        This is a short summary of the app and how to use it. Currently, you are looking at the frontend that was made using 
        React with Vite and Tailwind for css. There is also an API .NET Core backend.
        The project was made for practice, playing with different concepts of app architecture,
        Docker, .NET Core, React.
      </p>
      <h1 className="text-xl font-bold text-blue-800 mt-4">Source code link</h1>
      <p className="text-md text-gray-800 leading-relaxed">
        <a href="https://github.com/mPunc/ToDoChecker"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline">
          https://github.com/mPunc/ToDoChecker
        </a>
      </p>
      <h1 className="text-xl font-bold text-blue-800 mt-4">Docker commands</h1>
      <p className="text-md text-gray-800 leading-relaxed">
        For backend:
      </p>
      <p className="text-md text-gray-800 leading-relaxed">
        docker run -p 5001:5000 --name todo-api-container mpunch46/todo-api:latest
      </p>
      <p className="text-md text-gray-500 leading-relaxed">
        *note: the ports are fixed to 5001 for backend and 3000 for frontend for now
      </p>
      <h1 className="text-xl font-bold text-blue-800 mt-4">Summary</h1>
      <p className="text-md text-gray-800 leading-relaxed">
        This is a basic to-do list local web app, add tasks, complete them, view them in a list, add deadlines for yourself,
        use it as a reminder. Don't worry about sharing personal data. (No Internet connection required)
      </p>
      <h1 className="text-xl font-bold text-blue-800 mt-4">Get it working</h1>
      <p className="text-md text-gray-800 leading-relaxed">
        Step 1: Run the API container in the background (Docker Desktop)
      </p>
      <p className="text-md text-gray-800 leading-relaxed">
        Step 2: Go to Controls and press Generate XML to create the XML document where the data will be stored locally inside the container
        (you should only need to do this step once)
      </p>
      <p className="text-md text-gray-800 leading-relaxed">
        Step 3: Interact with the app using the frontend, done!
      </p>
      <p className="text-md text-gray-500 leading-relaxed mt-4">
        Made by: Marko Punčec
      </p>
    </div>
  );
}
