renderHtml('home-screen');

const links = document.querySelectorAll('.link');

for (const link of links) {
    link.addEventListener('click', handleLinkClick);
}

function handleLinkClick(e) {
    removeActiveLinks();
    e.target.classList.add('active');
}

function removeActiveLinks() {
    for (const link of links) {
        link.classList.remove('active');
    }
}

function getUniqueId() {
    const first = Math.random().toString(36).substr(2, 11);
    const second = Math.random().toString(36).substr(2, 11);
    return first.concat(second);
}

function bindCreateSessionEvents() {
    document.querySelectorAll('#create-session').forEach(a => {
        a.addEventListener('click', () => {
            renderHtml('create-screen');
            validateFields();
            hideErrorMsg();
            document.querySelector('#user-name').focus();
            document.querySelector('#screen-title').textContent = 'Create';
            document.querySelector('#session-id').value = getUniqueId();
        });
    });
}

bindCreateSessionEvents();

document.querySelector('#join-session').addEventListener('click', () => {
    renderHtml('join-screen');
    validateFields();
    hideErrorMsg();
    document.querySelector('#session-id').focus();
    document.querySelector('#screen-title').textContent = 'Join';
});

document.querySelector('#app-logo').addEventListener('click', () => {
    removeActiveLinks();
    renderHtml('home-screen');
    bindCreateSessionEvents();
    document.querySelector('#screen-title').textContent = 'Home';
});

function renderHtml(templateName) {
    const pane = document.querySelector('.pane');

    pane.innerHTML = '';

    const template = document.querySelector(`#${templateName}`);
    const clone = template.content.cloneNode(true);

    pane.appendChild(clone);
}

function validateFields() {
    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();

        const userName = e.target.userName.value.trim();
        const sessionId = e.target.sessionId.value.trim();

        if (userName && sessionId) this.submit();

        if (!userName)
            document.querySelector('#username-error').style.display = 'inline';

        if (!sessionId)
            document.querySelector('#session-error').style.display = 'inline';
    });
}

function hideErrorMsg() {
    document
        .querySelector('#user-name')
        .addEventListener(
            'input',
            () =>
                (document.querySelector('#username-error').style.display =
                    'none')
        );

    document
        .querySelector('#session-id')
        .addEventListener(
            'input',
            () =>
                (document.querySelector('#session-error').style.display =
                    'none')
        );
}
