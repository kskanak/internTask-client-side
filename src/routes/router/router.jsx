import { createBrowserRouter } from "react-router-dom";
import ApplyForm from "../../components/ApplyForm/ApplyForm";
import ConfirmMsg from "../../components/ConfirmMsg/ConfirmMsg";
import Main from "../../layout/Main";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      { path: "/", element: <ApplyForm></ApplyForm> },
      { path: "/confirmMsg", element: <ConfirmMsg></ConfirmMsg> },
    ],
  },
]);
