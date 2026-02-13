let menus = document.querySelectorAll('.mega');

function openMenu(id){
    menus.forEach(menu => menu.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function closeMenu(){
    menus.forEach(menu => menu.classList.remove('active'));
}
