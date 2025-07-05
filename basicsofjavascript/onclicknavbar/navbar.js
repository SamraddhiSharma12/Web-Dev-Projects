function createNavbar(navbarList) {
    const items = ['Home', 'About', 'Project', 'Contact'];
    items.forEach(text => {
        const li = document.createElement("li");
        li.textContent = text;
        navbarList.appendChild(li);
    });
}