import React from 'react';
import MainPage from './pages/Main';
import CoursesCatalog from './pages/Catalog';
import CoursePage from './pages/Catalog';
import AdminPage from './pages/AdminPage';

const routes = [
    {
        path: `/`,
        exact: true,
        title: ``,
        component: MainPage
    },
    {
        path: `/profile`,
        exact: true,
        title: ``,
        component: AdminPage
    },
    {
        path: `/courses`,
        exact: true,
        title: ``,
        component: CoursesCatalog
    },
    {
        path: `/courses/course:id`,
        exact: true,
        title: ``,
        component: CoursePage
    },
    {
        path: `/tests`,
        exact: true,
        title: ``,
        component: CoursesCatalog
    },
    {
        path: `/admin`,
        exact: true,
        title: ``,
        component: AdminPage
    },
    {
        component: () => <div>
            <h2>404</h2>
        </div>
    }
];

export default routes;
