document.addEventListener('DOMContentLoaded', function() {
    const API_BASE_URL = "https://reqres.in/api";
    const API_KEY = "reqres-free-v1";

async function fetchAndDisplayUsers() {
    try { 
        const response = await fetch(`${API_BASE_URL}/users?page=1`, {
            headers: {
                'x-api-key': API_KEY
            }
        });
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        const data = await response.json();
        

        const template = document.getElementById('user-card-template');
            const userList = document.getElementById('usuarios');
            userList.innerHTML = '';
            
            data.data.forEach(user => {
                const userCardClone = document.importNode(template.content, true);

                const avatarImg = userCardClone.querySelector('.user-avatar');
                const nameH3 = userCardClone.querySelector('.user-name');
                const emailP = userCardClone.querySelector('.user-email');

                avatarImg.src = user.avatar;
                avatarImg.alt = `Avatar de ${user.first_name}`;
                nameH3.textContent = `${user.first_name} ${user.last_name}`;
                emailP.textContent = user.email;

                userList.appendChild(userCardClone);
         });  
    } catch (error) { 
        console.error('Falha ao buscar usuários:', error);
    }
}
async function createUser(event) {
    event.preventDefault(); 
    const nome = document.getElementById('nome').value;
    const job = document.getElementById('job').value;
  
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {

            method: 'POST', 
            
            headers: {
                'x-api-key': API_KEY, 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ 
                name: nome,
                job: job
            })
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        const data = await response.json();
        alert(`Usuário "${data.name}" criado com sucesso! O ID novo é: ${data.id}`);
        
        document.getElementById('form-cadastro').reset();

    } catch(error) {
        console.error('Falha ao criar usuário:', error);
        alert('Falha ao criar usuário. Verifique o console.');
    }
}

const formCadastro = document.getElementById('form-cadastro');

if (document.getElementById('usuarios')) {
    fetchAndDisplayUsers();
}

if (document.getElementById('form-cadastro')) {
    document.getElementById('form-cadastro').addEventListener('submit', createUser);
}
});