const testAdminAccess = async () => {
    try {
        // 1. Login
        console.log('Logging in as admin...');
        const loginRes = await fetch('http://127.0.0.1:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@luxecart.com',
                password: 'adminpassword'
            })
        });

        const loginData = await loginRes.json();
        const token = loginData.token;
        console.log('Login successful. Token:', token ? 'Received' : 'Missing');

        if (!token) return;

        // 2. Access Admin Stats
        console.log('Accessing admin stats...');
        const statsRes = await fetch('http://127.0.0.1:5000/api/admin/stats', {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (statsRes.status === 200) {
            const statsData = await statsRes.json();
            console.log('Admin stats accessed successfully:', statsData);
        } else {
            console.log(`Failed to access stats. Status: ${statsRes.status}`);
            const errorData = await statsRes.json();
            console.log('Error:', errorData);
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
};

testAdminAccess();
