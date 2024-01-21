import { createBrowserRouter } from 'react-router-dom';
import App from '../App';

const MainRoute = createBrowserRouter([
    {
        path:'/',
        element: <App/>,

    }
])

export default MainRoute;