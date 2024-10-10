import { RouterProvider } from "react-router-dom";
import { AppProvider } from "./provider";
import router from "./route/route";

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
