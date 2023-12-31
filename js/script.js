var flag = 0;
var ham = document.querySelector(".check");
var navbar_child = document.querySelector(".navbar").children;
var content = document.querySelector(".content");
var content_con = document.querySelector(".content_container");
var arrow = document.querySelectorAll(".arrow");
var page = document.getElementsByClassName('page');
var i = 0;
var j = 0;
var active_index = 0;
document.addEventListener("mouseover", (event) => {
    if (content_con.matches(":hover") && ham.checked != true) {
        arrowtoggle('add');
        content.classList.add("content_hover");
    }
    else if (ham.checked != true) {
        arrowtoggle('rem');
        content.classList.remove("content_hover");
    }
    else {
        arrowtoggle('add');
        content.classList.remove("content_hover");
    }
    if (ham.checked === true) {
        for (j = 0; j < page.length; j++) {
            page[j].classList.remove("page_hovonnav");
        }
        page[active_index].classList.add("page_hovonnav");
    }
    for (i = 0; i < navbar_child.length - 1; i++) {
        if (navbar_child[i].matches(":hover") && ham.checked === true) {
            for (j = 0; j < page.length; j++) {
                page[j].classList.remove("page_hovonnav");
            }
            page[i].classList.add("page_hovonnav");
        }
    }
});

arrow.forEach(element => {
    element.onclick = () => {
        element.classList.add("disable");
        setTimeout(() => {
            element.classList.remove("disable");
        }, 250);
        for (i = 0; i < page.length; i++) {
            if (page[i].getAttribute("data-value") === "active") {
                if (element.classList.contains("right")) {
                    flag = i + 1;
                    break;
                }
                if (element.classList.contains("left")) {
                    flag = i - 1;
                    break;
                }
            }
        }
        active_index = flag < 0 ? page.length - 1 : flag >= page.length ? 0 : flag;
        corosel(active_index);
    }
});

ham.onclick = () => {
    if (ham.checked === true) {
        arrowtoggle('add');
        for (j = 0; j < page.length; j++) {
            page[j].classList.add("ham_show");
        }
        page[active_index].classList.add("page_hovonnav");
    }
    else {
        ham_uncheck();
    }

}
function ham_uncheck() {
    for (j = 0; j < page.length; j++) {
        page[j].classList.remove("ham_show");
        page[j].classList.remove("page_hovonnav");
    }
}
content_con.onclick = a => {
    ham.checked = false;
    ham_uncheck();
}
function active(index) {
    if (ham.checked === true) {
        active_index = index;
        corosel(active_index);
        ham.checked = false;
        ham_uncheck();
    }
}
function arrowtoggle(type) {
    if (type === "add") {
        arrow.forEach(element => {
            element.classList.add("small");
        });
    }
    else {
        arrow.forEach(element => {
            element.classList.remove("small");
        });
    }
}
function corosel(active_index) {
    page[active_index].setAttribute("data-value", "active");
    page[(active_index + 1) % page.length].setAttribute("data-value", "after_active");
    page[(active_index + page.length - 1) % page.length].setAttribute("data-value", "before_active");
    page[(active_index + page.length - 2) % page.length].setAttribute("data-value", "inactive");
    page[(active_index + 2) % page.length].setAttribute("data-value", "inactive");
}
j=0;
setInterval(() => {
    var status_tt = document.getElementsByClassName("status_tt");
    for (i = 0; i < status_tt.length; i++) {
        status_tt[i].classList.remove("status_show");
    }
    if (j >= status_tt.length)
        j = 0;
    status_tt[j].classList.add("status_show");
    var letters = status_tt[j].textContent.length;
    j++;
    if (j >= status_tt.length)
        j = 0;
    var status_text = document.querySelector(".status_text");
    const keyframe = [
        { width: "0%" },
        { width: `${letters}ch` },
        { width: `${letters}ch` },
    ];
    const timing = {
        duration: 1500,
        iterations: 2,
        direction: "alternate",
        easing: `steps(${letters})`,
    };
    status_text.animate(keyframe, timing);
}, 3000);