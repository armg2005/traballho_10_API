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
fetchAndDisplayUsers()

});