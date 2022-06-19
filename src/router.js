import React from 'react';
import MainPage from './pages/Main';
import ProfilePage from './pages/Profile';
import CoursesCatalog from './pages/CoursesCatalog';
import AuthorsCatalog from './pages/CoursesCatalog/Authors';
import TopicsCatalog from './pages/CoursesCatalog/Topics';
import TestCatalog from './pages/TestCatalog';
import TestPage from './pages/TestCatalog/TestPage';
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
        component: ProfilePage
    },
    {
        path: `/courses`,
        exact: true,
        title: ``,
        component: CoursesCatalog
    },
    {
        path: `/courses/authors`,
        exact: true,
        title: ``,
        component: AuthorsCatalog
    },
    {
        path: `/courses/topics`,
        exact: true,
        title: ``,
        component: TopicsCatalog
    },
    {
        path: `/tests`,
        exact: true,
        title: ``,
        component: TestCatalog
    },
    {
        path: `/tests/test:id`,
        exact: true,
        title: ``,
        component: TestPage
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
