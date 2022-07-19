//////////////////////// LANGUAGE CHANGE /////////////////////////////

// Tüm DOM yüklenince çalışacak fonksiyon
window.addEventListener("DOMContentLoaded", (event) => {

    // Eğer cookie de lang değeri yoksa default olarak dili ingilizce olacak şekilde ayarlıyoruz
    if (getCookie("lang") == null) {
        document.cookie = "lang=en";
    }

    const htmlElement = document.getElementsByTagName("html")[0];
    const cookieKey = getCookie("lang");

    // html elementinin lang attribute ine cookie den gelen değeri atıyoruz. en değeri varsa en, tr değeri varsa tr ekliyoruz lang="en" gibi
    htmlElement.setAttribute('lang', cookieKey);


    elementLanguageChange(cookieKey);
});

const langItem = document.querySelectorAll('.language__item');

langItem.forEach(langElement => {
    langElement.addEventListener('click', () => {
        const dataLang = langElement.getAttribute('data-lang');
        setCookie(dataLang);
        const htmlElement = document.getElementsByTagName("html")[0];
        const cookieKey = getCookie("lang");
        htmlElement.setAttribute('lang', cookieKey);

        elementLanguageChange(dataLang);

        window.location.reload();
    })
})

const trLangElement = document.querySelector("[data-lang='tr']");
const enLangElement = document.querySelector("[data-lang='en']");

// Cookide lang isimli veriyi yakalıyoruz. Örnek 'en' 'tr' gibi 
const cookieValue = getCookie('lang');

// eğer cooki den gelen değer en ise çeviri butonlarında aktif pasif durumu ayarlanıyor
if (cookieValue === 'en') {
    enLangElement.classList.add('active');
    trLangElement.classList.remove('active');
}
else if (cookieValue === 'tr') {
    trLangElement.classList.add('active');
    enLangElement.classList.remove('active');
}

// İngilizceye çevirme butonuna tıklayınca çalışacak fonksiyon
// Tıklanan butonu pasif duruma çekiyor Türkçe çeviri butonunu aktif duruma getiriyor. 
enLangElement.addEventListener('click', () => {
    enLangElement.classList.add('active');
    trLangElement.classList.remove('active');
})

// Türkçeye çevirme butonuna tıklayınca çalışacak fonksiyon
// Tıklanan butonu pasif duruma çekiyor İngilizce çeviri butonunu aktif duruma getiriyor. 
trLangElement.addEventListener('click', () => {
    trLangElement.classList.add('active');
    enLangElement.classList.remove('active');
})

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

        // init Isotope elements
        var box = $(".portfolio__wrapper").isotope({
            itemSelector: ".portfolio__item"
        });

        // filter functions
        // bind filter button click
        $(".portfolio__filter").on("click", "button", function () {
            $(".portfolio__filter").find(".active").removeClass("active");
            $(this).addClass("active");

            var filterValue = $(this).attr("data-type");

            if (filterValue !== "*") {
                filterValue = '[data-type="' + filterValue + '"]';
            }

            box.isotope({ filter: filterValue });
        });

    })
});


/////////////////////////////// PORTFOLIO FILTER - ISOTOPE /////////////////////////////////////

// init Isotope elements
var box = $(".portfolio__wrapper").isotope({
    itemSelector: ".portfolio__item"
});

// filter functions
// bind filter button click
$(".portfolio__filter").on("click", "button", function () {
    $(".portfolio__filter").find(".active").removeClass("active");
    $(this).addClass("active");

    var filterValue = $(this).attr("data-type");

    if (filterValue !== "*") {
        filterValue = '[data-type="' + filterValue + '"]';
    }

    box.isotope({ filter: filterValue });
});


function removeElementClass(element, className) {
    element.classList.remove(className);
}

function addElementClass(element, className) {
    element.classList.add(className);
}

function setCookie(key) {
    document.cookie = "lang=" + key;
}

// cookie ismine göre arama yapıyor varsa geriye cookie değeri dönüyor
function getCookie(key) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${key}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

// tüm içeriklerde dil çevirisi yaptığımız fonksiyon
function elementLanguageChange(lang) {
    // data-key attribute i olan tüm elementleri yakalayıp json dosyasından çektiğimiz veriler ile değiştiriyoruz
    document.querySelectorAll("[data-key]").forEach((element) => {
        const key = element.getAttribute("data-key");
        if (key) {
            fetch("/assets/js/language.json")
                .then((response) => response.json())
                .then((data) => {
                    element.textContent = data.languages[lang].strings[key];
                });
        }
    });
}
