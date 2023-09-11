import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/webapp-home';
import LoginPage from '@/components/webapp-login';
import SignUpPage from '@/components/webapp-signup';
import MachinesPage from '@/components/webapp-machines'
import UsersPage from '@/components/webapp-users';
import NotFoundPage from '@/components/webapp-notfound';
import CreateMachine from '@/components/create/create-machine';
import CreateUser from '@/components/create/create-user-account'

const routes = [
    {
        path: '/',
        name: 'Home Page',
        component: HomePage,
        props: (route) => ({ uData: route.params.uData })
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
        component: MachinesPage,
        props: function (route) { ({ uData: route.params.uData }) }
    },
    {
        path: '/addMachine',
        name: 'Create Machine',
        component: CreateMachine,
        props: (route) => ({ uData: route.params.uData })
    },
    {
        path: '/users',
        name: 'View Users',
        component: UsersPage,
        props: function (route) { ({ uData: route.params.uData }) }
    },
    {
        path: '/addUser',
        name: 'Create User',
        component: CreateUser,
        props: (route) => ({ uData: route.params.uData })
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
