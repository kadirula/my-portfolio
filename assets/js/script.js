////////////////////////// SKILL PERCENT /////////////////////////////
const skillCardItem = document.querySelectorAll('.skill-card__item');
skillCardItem.forEach(item => {
    const dataSkillCount = item.getAttribute("data-skill");
    const skillCardBg = item.querySelector('.skill-card__bg');
    const skillCardCountElement = item.querySelector('.skill-card__count');
    skillCardBg.style.width = dataSkillCount + "%";
    skillCardCountElement.append(dataSkillCount + "%");
});


////////////////////////// SECTION SHOW-REMOVE ACTION /////////////////////////////
const sidebarMenuLink = document.querySelectorAll('.sidebar__menu-link');
sidebarMenuLink.forEach(item => {

    item.addEventListener('click', () => {
        sidebarMenuLink.forEach(menuLink => {
            removeElementClass(menuLink, 'active');
        });
        item.classList.add('active');
        const sidebarMenuLinkData = item.getAttribute('data-id');
        const sectionElement = document.getElementById(sidebarMenuLinkData);

        const sectionElements = document.querySelectorAll('.section');

        sectionElements.forEach(element => {
            removeElementClass(element, 'active');
        });

        addElementClass(sectionElement, 'active');

    })
});


/////////////////////////////// PORTFOLIO FILTER - ISOTOPE /////////////////////////////////////

// init Isotope elements
var $box = $(".portfolio__wrapper").isotope({
    itemSelector: ".portfolio__item"
});

// filter functions
// bind filter button click
$(".portfolio__filter").on("click", "button", function () {
    var filterValue = $(this).attr("data-type");
    $(".portfolio__filter").find(".active").removeClass("active");
    $(this).addClass("active");
    if (filterValue !== "*") {
        filterValue = '[data-type="' + filterValue + '"]';
    }
    $box.isotope({ filter: filterValue });
});


function removeElementClass(element, className) {
    element.classList.remove(className);
}

function addElementClass(element, className) {
    element.classList.add(className);
}