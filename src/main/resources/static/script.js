const API_BASE = 'http://localhost:8080/api/blockchain';
const USERNAME = 'user';
const PASSWORD = '2b742208-59e1-4581-9269-a7a6aa81ac56';

// Create Basic Auth header
function getAuthHeader() {
    return 'Basic ' + btoa(USERNAME + ':' + PASSWORD);
}

// Register Identity
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const documentNumber = document.getElementById('documentNumber').value;
    
    try {
        const response = await fetch(`${API_BASE}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getAuthHeader()
            },
            body: JSON.stringify({ name, email, documentNumber })
        });
        
        if (response.ok) {
            const result = await response.json();
            showMessage('registerResult', `✅ Identity registered successfully! ID: ${result.id}`, 'success');
            document.getElementById('registerForm').reset();
        } else {
            showMessage('registerResult', `❌ Error: ${response.statusText}`, 'error');
        }
    } catch (error) {
        showMessage('registerResult', `❌ Error: ${error.message}`, 'error');
    }
});

// Get Blockchain
async function getChain() {
    try {
        const response = await fetch(`${API_BASE}/chain`, {
            headers: {
                'Authorization': getAuthHeader()
            }
        });
        
        if (response.ok) {
            const blocks = await response.json();
            displayChain(blocks);
        } else {
            document.getElementById('chainResult').innerHTML = `<p>Error: ${response.statusText}</p>`;
        }
    } catch (error) {
        document.getElementById('chainResult').innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

// Display Blockchain
function displayChain(blocks) {
    if (!blocks || blocks.length === 0) {
        document.getElementById('chainResult').innerHTML = '<p>No blocks in blockchain yet.</p>';
        return;
    }
    
    let html = '<table><thead><tr><th>ID</th><th>Data</th><th>Hash</th><th>Previous Hash</th><th>Timestamp</th></tr></thead><tbody>';
    
    blocks.forEach(block => {
        html += `<tr>
            <td>${block.id}</td>
            <td>${block.data.substring(0, 20)}...</td>
            <td>${block.hash.substring(0, 20)}...</td>
            <td>${block.previousHash === '0' ? 'Genesis' : block.previousHash.substring(0, 20)}...</td>
            <td>${new Date(block.timestamp).toLocaleString()}</td>
        </tr>`;
    });
    
    html += '</tbody></table>';
    document.getElementById('chainResult').innerHTML = html;
}

// Verify Identity
async function verifyIdentity() {
    const id = document.getElementById('verifyId').value;
    
    if (!id) {
        showMessage('verifyResult', '⚠️ Please enter an Identity ID', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/verify/${id}`, {
            headers: {
                'Authorization': getAuthHeader()
            }
        });
        
        if (response.ok) {
            const result = await response.text();
            showMessage('verifyResult', result, 'success');
        } else {
            showMessage('verifyResult', `❌ Error: ${response.statusText}`, 'error');
        }
    } catch (error) {
        showMessage('verifyResult', `❌ Error: ${error.message}`, 'error');
    }
}

// Helper function to show messages
function showMessage(elementId, message, type) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.className = type;
}
