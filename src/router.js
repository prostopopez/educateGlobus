import React from 'react';
import MainPage from './pages/Main';
import CatalogPage from './pages/Catalog';
import DeliveryPage from './pages/Delivery';
import ContactPage from './pages/Contacts';
import AdminPage from './pages/AdminPage';

const routes = [
    {
        path: `/`,
        exact: true,
        title: ``,
        component: MainPage
    },
    {
        path: `/user`,
        exact: true,
        title: ``,
        component: CatalogPage
    },
    {
        path: `/courses`,
        exact: true,
        title: ``,
        component: CatalogPage
    },
    {
        path: `/tests`,
        exact: true,
        title: ``,
        component: DeliveryPage
    },
    {
        path: `/basket`,
        exact: true,
        title: ``,
        component: ContactPage
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
