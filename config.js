const SERVER_URL   = "http://localhost/insuretech-api/index.php/";
const DOWNLOAD_URL = "http://localhost/insuretech-api/uploads/";
const BASE_URL     = "http://localhost/admin.insuretech/";
let pagename       = 'home'; // Default to 'home' page
let TOKEN          = null;
let ADMIN_USERNAME = null;
let ADMIN_ID       = null;
let USER_TYPE      = null; //ADMIN

function initGlobalVars() {
	pagename       = 'home'; // Default to 'home' page
	TOKEN          = null;
	ADMIN_USERNAME = null;
	ADMIN_ID       = null;
	USER_TYPE      = null; //ADMIN	
}