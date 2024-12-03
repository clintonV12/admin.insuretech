// app.js
import { AuthHeader} from './components/common/auth-header.js';
import { AuthFooter } from './components/common/auth-footer.js';
import { DashHeader } from './components/common/dash-header.js';
import { DashFooter } from './components/common/dash-footer.js';

import { AdminLogin } from './components/admin/admin-login.js';
import { AdminLoginAjax } from './controllers/admin/admin-login.js';

import { AdminPasswordRecovery } from './components/admin/admin-password-recover.js';

import { AdminSideBar } from './components/admin/admin-sidebar.js';
import { AdminDashboard } from './components/admin/admin-dashboard.js';
import { RequestAllClientInfo, RequestStats } from './controllers/admin/admin-dashboard.js';

import { TransactionHistory } from './components/admin/client_details/transaction-history.js';
import { Beneficiary } from './components/admin/client_details/beneficiary.js';
import { Covered } from './components/admin/client_details/covered.js';

import { RequestBeneficiaryInfo } from './controllers/admin/client_details/beneficiary.js';
import { RequestCoveredInfo } from './controllers/admin/client_details/covered.js';
import { RequestTranasctionInfo } from './controllers/admin/client_details/transaction_history.js';

import { Claims } from './components/admin/claims.js';
import { RequestAllClaimsInfo } from './controllers/admin/claims.js';

import { Agents } from './components/admin/agents.js';
import { RequestAllAgentsInfo, AddNewAgent } from './controllers/admin/agents.js';

import { Stuff } from './components/admin/stuff.js';
import { RequestAllStuffInfo, AddNewStuff } from './controllers/admin/stuff.js';

let pageTitle = 'Home';

function setPageName(page) {
    console.log(page);
    pagename = page;
    setPageTitle();
}

// Function to get the current page name
function getPageName() {
    return pagename;
}

function renderAuthPage(content) {
    document.getElementById('app').innerHTML = `
        ${AuthHeader()}
        <div id="content">${content}</div>
        ${AuthFooter()}
    `;

    // Attach event listeners to the navigation links
    document.querySelectorAll('.nav-page').forEach(link => {
        link.addEventListener('click', (event) => {
            setPageName(event.target.id);
            router();
        });
    });

    getControllerFunctions(pagename);
}

// Function to render the full page
function renderPage(content) {
    let sideBarContent = ``;

    sideBarContent = AdminSideBar();

    document.getElementById('app').innerHTML = `
        <div id="content">
        ${sideBarContent}
        <main class="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        ${DashHeader(pageTitle)}
        <div class="container-fluid py-4">
        ${content}
        ${DashFooter()}
        </div>
        </main>
        </div>
    `;

    // Attach event listeners to the navigation links
    document.querySelectorAll('.nav-page').forEach(link => {
        link.addEventListener('click', (event) => {
            setPageName(event.target.id);
            router();
        });
    });

    if (pagename == 'transaction-history' ||
        pagename == 'beneficiary' ||
        pagename == 'covered'
        ) 
    {
        document.getElementById('admin-dashboard').classList.add('active');
    } else{
        document.getElementById(pagename).classList.add('active');
    }

    getControllerFunctions(pagename);
}

// Function to load the correct content based on pagename
export async function router() {
    let content = '';

    switch (pagename) {
        case 'login':
        case 'logout':
        case 'home':
            content = await AdminLogin();
            break;
        case 'admin-password-recover':
            content = await AdminPasswordRecovery();
            break;
        case 'admin-dashboard':
            content = await AdminDashboard();
            break;
        case 'claims':
            content = await Claims();
            break;
        case 'agents':
            content = await Agents();
            break;
        case 'stuff':
            content = await Stuff();
            break;
        case 'transaction-history':
            content = await TransactionHistory();
            break;
        case 'beneficiary':
            content = await Beneficiary();
            break;
        case 'covered':
            content = await Covered();
            break;
        default:
            content = await AdminLogin();
    }

    pageSelector(pagename, content);
}

function pageSelector(pagename, content) {
    switch (pagename) {
        case 'login':
        case 'logout':
        case 'home':
        case 'admin-password-recover':
            renderAuthPage(content);
            break;
        default:
            renderPage(content);
    }
}

function setPageTitle() {
    switch (pagename) {
        case 'claims':
            pageTitle = 'Submitted Claims'
            break;
        case 'agents':
            pageTitle = 'Agents'
            break;
        case 'stuff':
            pageTitle = 'Staff'
            break;
        case 'transaction-history':
            pageTitle = 'Transaction History';
            break;
        case 'beneficiary':
            pageTitle = 'Beneficiary';
            break;
        case 'covered':
            pageTitle = 'Covered'
            break;
        default:
            pageTitle = 'Home';
    }
}

// Attach event listeners to navigation links
document.addEventListener('DOMContentLoaded', () => {
    // Load the correct page on initial load
    const initialPage = getPageName();
    setPageName(initialPage);
    router();
});

function getControllerFunctions(pagename) {
    switch (pagename) {
        case 'login':
        case 'logout':
        case 'home':
            AdminLoginAjax();
            break;
        case 'admin-password-recover':
            break;
        case 'admin-dashboard':
            RequestAllClientInfo();
            RequestStats();
            break;
        case 'claims':
            RequestAllClaimsInfo();
            break;
        case 'agents':
            RequestAllAgentsInfo();
            AddNewAgent();
            break;
        case 'stuff':
            RequestAllStuffInfo();
            AddNewStuff();
            break;
        case 'transaction-history':
            RequestTranasctionInfo();
            break;
        case 'beneficiary':
            RequestBeneficiaryInfo();
            break;
        case 'covered':
            RequestCoveredInfo();
            break;
    }
}

window.router   = router;