import LoginComponent from './LoginComponent.js'
import DashboardComponent from './DashboardComponent.js'
const routerConfig = {
    'login': {
        data: {},
        url: 'login',
        component: LoginComponent,
    },
    'dashboard': {
        data: {},
        url: 'dashboard',
        component: DashboardComponent,
    },
}
export default routerConfig;