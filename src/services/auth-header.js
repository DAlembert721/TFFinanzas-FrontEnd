// auth-header.js

// Helper function for generating Authorization header if available

export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    if (user && user.access) {
        console.log(`Bearer ${user.token}`);
        return {'Authorization': 'Bearer ' + user.access};
    } else {
        console.log("No token available");
        return {};
    }

}
