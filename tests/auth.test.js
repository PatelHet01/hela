const axios = require('axios');

const API_URL = 'http://localhost:3000/api/v1';

async function runTests() {
    try {
        console.log('--- Starting Auth & Workspace Tests ---');

        // 1. Register User
        const registerData = {
            name: 'Test Admin',
            email: `admin${Date.now()}@hela.test`,
            password: 'password123'
        };
        console.log(`\n[+] Registering User: ${registerData.email}`);

        const registerRes = await axios.post(`${API_URL}/auth/register`, registerData);
        console.log('Register Response:', registerRes.data);

        // 2. Login User
        console.log('\n[+] Logging In');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: registerData.email,
            password: 'password123'
        });
        console.log('Login Response:', loginRes.data);

        const token = loginRes.data.token;
        if (!token) throw new Error('No token received');

        // 3. Create Workspace
        console.log('\n[+] Creating Workspace with token');
        const workspaceData = { name: 'My First Workspace' };
        const workspaceRes = await axios.post(`${API_URL}/workspaces`, workspaceData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Create Workspace Response:', workspaceRes.data);

        // 4. Get Workspaces
        console.log('\n[+] Fetching Workspaces');
        const getWorkspacesRes = await axios.get(`${API_URL}/workspaces`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Get Workspaces Response:', getWorkspacesRes.data);

        console.log('\n✅ All tests passed successfully!');

    } catch (error) {
        console.error('\n❌ Test Failed:');
        if (error.response) {
            console.error(error.response.status, error.response.data);
        } else {
            console.error(error.message);
        }
    }
}

runTests();
