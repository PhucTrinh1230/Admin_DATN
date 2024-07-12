
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import routes from './routesConfig';
import './ButtonSupport.css'
const Btn = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const currentRouteIndex = routes.findIndex(route => route.path === location.pathname);

    const handleNext = () => {
        const nextRoute = routes[currentRouteIndex + 1];
        if (nextRoute) {
            navigate(nextRoute.path);
        }
    };

    const handlePrev = () => {
        const prevRoute = routes[currentRouteIndex - 1];
        if (prevRoute) {
            navigate(prevRoute.path);
        }
    };

    const nextRouteName = routes[currentRouteIndex + 1]?.name;
    const prevRouteName = routes[currentRouteIndex - 1]?.name;

    return (
        <div className='btn-group'>
            {prevRouteName && (
                <button className='btn btn-light btnPrev m-3' onClick={handlePrev}>
                    Trở về<br></br>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                    </svg> {prevRouteName}
                </button>
            )}

            {nextRouteName && (
                <button className='btn btn-light btnNext m-3' onClick={handleNext}>

                    Đến  <br></br>
                    {nextRouteName} <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default Btn;

