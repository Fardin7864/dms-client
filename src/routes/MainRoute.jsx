import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Error from '../pages/Error/Error';
import Home from '../pages/home/Home';
import Companys from '../pages/Companys/Companys';
import Categorys from '../pages/Categorys/Categorys';

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
            }
        ]

    }
])

export default MainRoute;