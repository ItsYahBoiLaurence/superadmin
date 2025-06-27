import { useRoutes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Clients from "./components/pages/Clients";
import Users from "./components/pages/Users";

export default function Routes() {
    return useRoutes([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Clients />,
                },
                {
                    path: '/users',
                    element: <Users />,
                }, {
                    path: '/clients',
                    element: <Clients />,
                },
            ],
        },
    ]);
}