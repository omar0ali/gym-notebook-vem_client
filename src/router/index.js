import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/webapp-home';
import LoginPage from '@/components/webapp-login';
import SignUpPage from '@/components/webapp-signup';
import MachinesPage from '@/components/webapp-machines'
import NotFoundPage from '@/components/webapp-notfound';


const routes = [
    {
        path: '/',
        name: 'Home Page',
        component: HomePage
    },{
        path: '/login',
        name: 'Login Page',
        component: LoginPage
    },
    {
        path: '/signup',
        name: 'Sign Up Page',
        component: SignUpPage
    },
    {
        path: '/machines',
        name: 'View Machines',
        component: MachinesPage
    },
    {
        path: '/:catchAll(.*)',
        name: 'Not Found Page',
        component: NotFoundPage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
