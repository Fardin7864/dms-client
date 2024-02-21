import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Error from '../pages/Error/Error';
import Home from '../pages/home/Home';
import Companys from '../pages/Companys/Companys';
import Categorys from '../pages/Categorys/Categorys';
import Products from '../pages/Products/Products';

const MainRoute = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        errorElement: <Error/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path:'/companys',
                element: <Companys/>
            },
            {
                path:'/categorys',
                element: <Categorys/>
            },
            {
                path: '/products',
                element: <Products/>
            }
        ]

    }
])

export default MainRoute;