import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Cards, DataTable, OtpForm } from "./components";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<OtpForm />} />
      <Route path={"otp-form"} element={<OtpForm />} />
      <Route path="course-list" element={<Cards />} />
      <Route path="batches" element={<DataTable />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>

  </RouterProvider>
);
