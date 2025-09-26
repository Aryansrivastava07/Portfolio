var flag = 0;
var nav = document.querySelector(".nav");
var ham = document.querySelector(".check");
var con = document.querySelector(".container");
var navbar_child = document.querySelector(".navbar").children;
var content = document.querySelector(".content");
var arrow = document.querySelectorAll(".arrow");
var page = document.getElementsByClassName('page');
var cursor = document.querySelector(".cursor");
var cursorfolower = document.querySelector(".cursor_folower");
var arrow_left = document.querySelector(".arrow_left");
var arrow_right = document.querySelector(".arrow_right");
var arrowfromtop = arrow_left.getBoundingClientRect().top;
var i = 0;
var j = 0;
var active_index = 0;
var start_point = 0;
var width = page[0].offsetWidth;
window.onresize = () => {
    setTimeout(() => {
        width = page[0].offsetWidth;
        arrowfromtop = arrow_left.getBoundingClientRect().top;
    }, 500);
}
con.onclick = () => {
    ham.checked = false;
    ham_uncheck();
}

document.addEventListener("mousemove", e => {
    if (content.matches(":hover") && ham.checked != true) {
        arrowtoggle('hide');
        content.classList.add("content_hover");
    } else if (ham.checked != true) {
        arrowtoggle('show');
        content.classList.remove("content_hover");
    } else {
        arrowtoggle('hide');
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
    arrow.forEach(element => {
        if (Math.abs(e.clientY - arrowfromtop) < 100 && element.matches(":hover")) {
            if (element.classList.contains("left")) {
                element.style.transform = `translateY(${(e.clientY - arrowfromtop)}px)`;
            } else if (element.classList.contains("right"))
                element.style.transform = `translate(0,${(arrowfromtop - e.clientY)}px)`;
        } else {
            element.style.transform = "none";
        }
    })
    cursor.style.opacity = "1";
    cursorfolower.style.opacity = "1";
    cursorfolower.style.left = `${e.clientX}px`;
    cursorfolower.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});
window.oncontextmenu = e => {
    e.preventDefault();
    e.stopPropagation();
}

window.addEventListener("pointerdown", e => {
    cursorfolower.style.scale = "0";
});
window.addEventListener("pointerup", e => {
    cursorfolower.style.scale = "1";
});

content.addEventListener("pointerdown", e => {
    start_point = e.clientX;
    content.addEventListener("pointermove", touch);
});
var touch = e => {
    e.preventDefault();
    var distance = e.clientX - start_point;
    if (Math.abs(distance) >= .3 * width) {
        if (distance < 0)
            arrow[1].click();
        else if (distance > 0)
            arrow[0].click();
        end();
    }
}
content.addEventListener("pointerup", end);
content.addEventListener("pointerleave", end);

function end() {
    content.removeEventListener("pointermove", touch);
}

arrow.forEach(element => {
    element.onclick = () => {
        element.classList.add("arrow_hide");
        setTimeout(() => {
            element.classList.remove("arrow_hide");
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
        arrowtoggle('hide');
        for (j = 0; j < page.length; j++) {
            page[j].classList.add("pageon_ham_show");
        }
        page[active_index].classList.add("page_hovonnav");
    } else {
        ham_uncheck();
    }

}

function ham_uncheck() {
    for (j = 0; j < page.length; j++) {
        page[j].classList.remove("pageon_ham_show");
        page[j].classList.remove("page_hovonnav");
    }
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
    if (type === "hide") {
        arrow.forEach(element => {
            element.classList.add("arrow_hide");
        });
    } else {
        arrow.forEach(element => {
            element.classList.remove("arrow_hide");
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
j = 0;
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
    const keyframe = [{
            width: "0%"
        },
        {
            width: `${letters}ch`
        },
        {
            width: `${letters}ch`
        },
    ];
    const timing = {
        duration: 1500,
        iterations: 2,
        direction: "alternate",
        easing: `steps(${letters})`,
    };
    status_text.animate(keyframe, timing);
}, 3000);
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
        cursor.style.opacity = "0";
        cursorfolower.style.opacity = "0";
    }
});