import App from "./App"
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Catalog from "./pages/Catalog"
import RealtyPage from "./pages/RealtyPage";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import {store} from "./store/store";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Catalog />,
            },
            {
                path: "/category/:categoryName",
                element: <Catalog />,
            },
            {
                path: "/search/:searchQuery",
                element: <Catalog />,
            },
            {
                path: "/object/:realtyId",
                element: <RealtyPage />
            },
        ]
    },
], {
    basename: "/"
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
    .render(
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    )
