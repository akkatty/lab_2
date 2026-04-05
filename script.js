const systemInfo = navigator.userAgent;
localStorage.setItem('os_info', systemInfo);

const savedInfo = localStorage.getItem('os_info');
const footer = document.getElementById('footer');
if (footer && savedInfo) {
    footer.textContent = "Система " + savedInfo
}

const url = `https://jsonplaceholder.typicode.com/posts/10/comments`;
async function getComments() {
    try {
        const response = await fetch(url);
        const comments = await response.json();
        renderComments(comments);
    } catch (error) {
        console.error("Помилка завантаження:", error);
    }
}

function renderComments(comments) {
    const container = document.getElementById('comments-container');
    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment-item';
        commentDiv.innerHTML = `
            <strong>${comment.name}</strong> <br>
            <small>${comment.email}</small>
            <p>${comment.body}</p>
        `;
        container.appendChild(commentDiv);
    });
}
getComments();


const modal = document.getElementById('contactModal');
const closeBtn = document.querySelector('.close-button');

function showModal() {
    modal.style.display = 'block';
}

setTimeout(showModal, 60000);

closeBtn.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}


const themeToggle = document.getElementById('theme-toggle');

function setThemeByTime() {
    const hour = new Date().getHours();

    if (hour >= 7 && hour < 21) {
        document.body.classList.remove('dark-theme');
        themeToggle.checked = false;
    } else {
        document.body.classList.add('dark-theme');
        themeToggle.checked = true;
    }
}

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
});
setThemeByTime();
