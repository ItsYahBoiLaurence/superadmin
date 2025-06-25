import { useRoutes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Clients from "./components/custom/Clients";
import Users from "./components/custom/Users";

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