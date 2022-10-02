//giving underline to nav element
const underlineNavElement = (element) => {
    let grandParent = element.parentElement.parentElement;
    console.log(grandParent);
    let childrens = grandParent.children;
    Array.from(childrens).forEach((child) => {
        if(child.children[0].classList.contains('active')) {
            child.children[0].classList.remove('active');
        }
    });
    element.classList.add('active');
}


//toggling login popup
const toggleOnLogin = () => {
    let popup = document.getElementById('login').children[0];
    popup.classList.add('active');
}

const toggleOffLogin = () => {
    let popup = document.getElementById('login').children[0];
    popup.classList.remove('active');
}

let loginBtn = document.getElementById('login-btn');
loginBtn.addEventListener('click', () => {
        toggleOnLogin(),
        toggleOffNavbar()
    }
);

let closeBtn = document.getElementById('close-btn');
closeBtn.addEventListener('click',toggleOffLogin);

//giving background color to each feature
const bgColors = ['#fddde4', '#cdebbc', '#d1e8f2', '#cdd4f8','#f6dbf6'];
let feature = document.getElementById('features');
let count = 0;
Array.from(feature.children).forEach(child => {
    let content = child.children[1];
    content.style.backgroundColor = bgColors[count++];
});

//responsive navbar with hamburger icon
// open navbar

let navbar = document.getElementById('navbar');
let bar = document.getElementById('ham-bar');
console.log(bar);
const toggleOnNavbar = () => {
    console.log(navbar);
    navbar.classList.add('active');
}
bar.addEventListener('click', toggleOnNavbar);

//close navbar
let close = document.getElementById('close');
console.log(close);
const toggleOffNavbar = () => {
    navbar.classList.remove('active');
}
close.addEventListener('click', toggleOffNavbar);


//install-app section

let appleInstallBtn = document.getElementById('apple-logo');
let googleInstallBtn = document.getElementById('google-logo');

const toggleWorkingAlert = () => {
    alert('Sorry for the inconvenience! Working on our Mobile App!')
}
appleInstallBtn.addEventListener('click', toggleWorkingAlert);
googleInstallBtn.addEventListener('click', toggleWorkingAlert);

//Fixing breaking of newsletter email input box
const newsletterEmailFix = (element) => {
    let parent = element.parentElement.parentElement;
    console.log(parent);
    parent.style.height='40vh';
}