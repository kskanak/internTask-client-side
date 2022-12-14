import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router/router";

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
