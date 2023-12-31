var flag = 0;
var ham = document.querySelector(".check");
var navbar = document.querySelector(".navbar");
var container = document.querySelector(".container");
var content = document.querySelector(".content");
var content_con = document.querySelector(".content_container");
var arrow_left = document.querySelector(".left");
var arrow_right = document.querySelector(".right");
var page = document.getElementsByClassName('page');
var no_hover = document.querySelector(".no_hover");
var i = 0;
var j = 0;
document.addEventListener("mouseover", (event) => {
    if (content_con.matches(":hover") && ham.checked != true) {
        arrow_left.classList.add("small");
        arrow_right.classList.add("small");
        content.classList.add("content_hover");
    }
    else if (ham.checked != true) {
        arrow_left.classList.remove("small");
        arrow_right.classList.remove("small");
        content.classList.remove("content_hover");
    }
    else {
        arrow_left.classList.add("small");
        arrow_right.classList.add("small");
        content.classList.remove("content_hover");
    }
}
);
arrow_right.onclick = () => {
    arrow_right.classList.add("disable");
    setTimeout(() => {
        arrow_right.classList.remove("disable");
    }, 450);
    for (i = 0; i < page.length - 1; i++) {
        if (page[i].getAttribute("data-value") === "active") {
            page[i + 1].setAttribute("data-value", "active");
            page[i].setAttribute("data-value", "before_active");
            if (i - 1 >= 0) {
                page[i - 1].setAttribute("data-value", "unknown");
            }
            else {
                page[page.length - 1].setAttribute("data-value", "unknown");
            }
            if (i + 2 <= page.length - 1) {
                page[i + 2].setAttribute("data-value", "after_active");
            } else {
                page[0].setAttribute("data-value", "after_active");
            }
            flag = 0;
            break;
        }
        else {
            flag = 1;
        }
    }
    if (flag === 1) {
        page[page.length - 2].setAttribute("data-value", "unknown");
        page[0].setAttribute("data-value", "active");
        page[1].setAttribute("data-value", "after_active");
        page[page.length - 1].setAttribute("data-value", "before_active");
    }

}
arrow_left.onclick = () => {
    arrow_left.classList.add("disable");
    setTimeout(() => {
        arrow_left.classList.remove("disable");
    }, 450);
    for (i = page.length - 1; i > 0; i--) {
        if (page[i].getAttribute("data-value") === "active") {
            page[i - 1].setAttribute("data-value", "active");
            page[i].setAttribute("data-value", "after_active");
            if (i + 1 <= page.length - 1) {
                page[i + 1].setAttribute("data-value", "unknown");
            }
            else {
                page[0].setAttribute("data-value", "unknown");
            }
            if (i - 2 >= 0) {
                page[i - 2].setAttribute("data-value", "before_active");
            } else {
                page[page.length - 1].setAttribute("data-value", "before_active");
            }
            flag = 0;
            break;
        }
        else {
            flag = 1;
        }
    }
    if (flag === 1) {
        page[page.length - 2].setAttribute("data-value", "before_active");
        page[0].setAttribute("data-value", "after_active");
        page[1].setAttribute("data-value", "unknown");
        page[page.length - 1].setAttribute("data-value", "active");
    }
}

ham.onclick = e => {
    if (ham.checked === true) {
        arrow_left.classList.add("small");
        arrow_right.classList.add("small");
        for (j = 0; j < 5; j++) {
            page[j].classList.add("ham_show");
        }
        document.querySelector(".skill_content").classList.remove("skillcontent_hover");
    }
    else {
        ham_uncheck();
    }
}
function ham_uncheck() {
    for (j = 0; j < 5; j++)
        page[j].classList.remove("ham_show");
    document.querySelector(".skill_content").classList.add("skillcontent_hover");
}
content_con.onclick = a => {
    ham.checked = false;
    ham_uncheck();
}
function active() {
    if (ham.checked === true) {
        for (i = 0; i < page.length - 1; i++) {
            page[i].setAttribute("data-value", "unknown");
            for (i = 0; i < page.length - 1; i++) {
                if (page[i].matches(":hover")) {
                    page[i].setAttribute("data-value", "active");
                    if (i - 1 >= 0) {
                        page[i - 1].setAttribute("data-value", "before_active");
                    }
                    else {
                        page[page.length - 1].setAttribute("data-value", "before_active");
                    }
                    if (i + 1 <= page.length - 1)
                        page[i + 1].setAttribute("data-value", "after_active");
                    else {
                        page[0].setAttribute("data-value", "after_active");
                    }
                }
            }
        }
    }
}









// arrow right ka logic
//     for(i=0;i<page.length-1;i++)
// {
//     if(page[i].classList.contains("active")){
//         page[i+1].classList.replace("after_active","active");
//         page[i].classList.replace("active","before_active");
//         if(i-1>=0){
//             page[i-1].classList.remove("before_active");
//         }
//         else{
//             page[page.length-1].classList.remove("before_active");
//         }
//         if(i+2<=page.length-1){
//             page[i+2].classList.add("after_active");
//         }else{
//             page[0].classList.add("after_active");
//         }
//         for(k=0;k<page.length-1;k++)
//         console.log(page[k].classList);
//         console.log(page[page.length-1].classList);
//         flag=0;
//         break;
//     }
//     else{
//         flag=1;
//     }
//     }
//     if(flag===1){
//         page[page.length-2].classList.remove("before_active");
//         page[0].classList.replace("after_active","active");
//         page[1].classList.add("after_active");
//         page[page.length-1].classList.replace("active","before_active");
//         for(k=0;k<page.length-1;k++)
//         console.log(page[k].classList);
//         console.log(page[page.length-1].classList);
//     }
