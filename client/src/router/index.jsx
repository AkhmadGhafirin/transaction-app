import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import Dashboard from "../pages/Dashboard";
import TransactionForm from "../pages/TransactionForm";
import TransactionTable from "../pages/TransactionTable";

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "transactions",
        element: <TransactionTable />,
      },
      {
        path: "transactions/create",
        element: <TransactionForm />,
      },
      {
        path: "transactions/update/:id",
        element: <TransactionForm />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>Page Not Found!</h1>,
  },
]);

export default router;
