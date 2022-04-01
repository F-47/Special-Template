
//Select Setting Box
let setting_box = document.querySelector(".setting-box")
let gear_icon = document.querySelector(".fa-gear")
gear_icon.onclick = function () {
    setting_box.classList.toggle("open")
    //toggle spin class on icon
    gear_icon.classList.toggle("fa-spin")
}

//////////////////////////////////////////////

//change main-color
let lis = document.querySelectorAll(".colors-list li")
let arrayLis = Array.from(lis)
arrayLis.forEach((li) => {
    li.addEventListener("click", (e) => {
        //Switch colors of body
        document.body.style.setProperty("--main-color", e.target.dataset.color)
        
        // set color on local storage
        localStorage.setItem("color_option", e.target.dataset.color)
        
        //remove class active from lis
        handleActive(e);
    });
});

//Local Storage and Colors(check if there is local sotrage color option)
let mainColors = localStorage.getItem("color_option")
if (mainColors !== null) {
    
    document.body.style.setProperty("--main-color", mainColors)
    
    //remove active class from all  colors list item
    arrayLis.forEach((li) => {
        li.classList.remove("active")
        
        //add active class on element with data color == local storage item
        if (li.dataset.color == mainColors) {
            //add active class then
            li.classList.add("active")
        }
    })
    
}

//////////////////////////////////////////////

//Get Array of imgs
let imgArr = ["bg1.jpg", "bg2.jpg", "bg3.png", "bg4.jpg", "bg5.jpg", "bg6.jpg"]

//background Option
let bgOption = true

//variable to control the bg interval
let bgInterval;
let landing_page = document.querySelector(".landing-page")

//function to randomize imgs
function randomizeImg() {
    if (bgOption === true) {
        bgInterval = setInterval(() => {
            // Get random number
            let randomNumber = Math.floor(Math.random() * imgArr.length)
            
            //change bg
            landing_page.style.backgroundImage = 'url("Imgs/'+imgArr[randomNumber] +'")'
            
            //local storage BackGround
            localStorage.setItem("bg", imgArr[randomNumber])
            
        }, 10000);
    }
}

//change Background Random Option
let randomBgsEl = document.querySelectorAll(".random-bgs span")
randomBgsEl.forEach((span) => {
    span.addEventListener("click", (e) => {

        handleActive(e);
        
        if (e.target.dataset.bg === "yes") {
            bgOption = true
            randomizeImg()
            localStorage.setItem("bgOption_item",true)
        } else {
            bgOption = false
            clearInterval(bgInterval)
            localStorage.setItem("bgOption_item",false)
        }
    });
});

//bgOption local storage
let bgLocalStorageOption= localStorage.getItem("bgOption_item")
if (bgLocalStorageOption !== null) {
    //remove active classes from all spans
    document.querySelectorAll(".random-bgs span").forEach((element) => {

        element.classList.remove("active");

    });
    if (bgLocalStorageOption === "true") {
        bgOption = true
        document.querySelector(".yes").classList.add("active")
    } else {
        bgOption = false
        document.querySelector(".no").classList.add("active")
    }
}

let active = localStorage.getItem("bg")
if (active !== null) {
    landing_page.style.backgroundImage = 'url("Imgs/'+active+'")'
}
randomizeImg();

//////////////////////////////////////////////

// Animate Skills When Reaching The Section

window.onscroll = function () {
    let allSkills = document.querySelectorAll(".skill-box .skill-progress span")
    if (scrollY >= 660) {
        allSkills.forEach((skill) => {
            skill.style.width = skill.dataset.progress;
        })
    }
}

//////////////////////////////////////////////
//create pop up with images in gallery

let ourGallery = document.querySelectorAll(".imgs-box img")
ourGallery.forEach((img) => {
    img.addEventListener("click", (e)=> {
        //create overlay element
        let overlay = document.createElement("div")

        //add class to overlay
        overlay.className = "popup-overlay"

        //append overlay to the body
        document.body.appendChild(overlay)

        //create the popUp box
        let popupBox = document.createElement("div");

        //add class to the box up box
        popupBox.className = "popup-box"

        if (img.alt !== null) {
            // create heading
            let imgHeading = document.createElement("h3")

            // create text for heading
            let imgText = document.createTextNode(img.alt)

            // append text to the heading 
            imgHeading.appendChild(imgText)

            //append imgHeading to popUp Box
            popupBox.appendChild(imgHeading)
        }

        //create the img 
        let popupImg = document.createElement("img")

        //set img source
        popupImg.src = img.src

        //put img inside pop up
        popupBox.appendChild(popupImg)

        //append the pop up box to the body
        document.body.appendChild(popupBox)

        //create the close span
        let closeButton = document.createElement("span")
        
        //create the close span text
        let closeButtonText = document.createTextNode("X")

        //append closeButtonText to close Button
        closeButton.appendChild(closeButtonText)

        //add class to the close button
        closeButton.className = "close-button"

        //append closeButton to the popUpBOx
        popupBox.appendChild(closeButton)
        
    })
})

//close popUp
document.addEventListener("click", (e) => {
    if (e.target.className === "close-button") {
        // Remove the popUp
        console.log(e.target)
        e.target.parentNode.remove()

        //remove overlay (using another way of removing)
        document.querySelector(".popup-overlay").remove()
    }
})

//Navigation Bullets Design

//select all bullets 
let bullets = document.querySelectorAll(".nav-bullets .bullet")

bullets.forEach((bullet) => {
    bullet.addEventListener("click", (e) => {
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior:'smooth'
        })
    })
})


//Bullets display

let bulletSpans = document.querySelectorAll(".Bullets-Option span")
let bulletsContainer = document.querySelector(".nav-bullets")

bulletSpans.forEach((span) => {
    span.addEventListener("click", (e) => {
        handleActive(e);
        if (span.dataset.display === "show") {
            bulletsContainer.style.display = "block"
            localStorage.setItem('bulletOption', 'block')
        } else {
            bulletsContainer.style.display = "none"
            localStorage.setItem('bulletOption', 'none')
        }
    })
})

let bulletLocalItem = localStorage.getItem("bulletOption")
if (bulletLocalItem !== null) {
    bulletSpans.forEach((span) => {
        span.classList.remove("active")
    })
    if (bulletLocalItem === "block") {
        bulletsContainer.style.display = "block"
        document.querySelector(".Bullets-Option .yes").classList.add("active")
    } else {
        bulletsContainer.style.display = "none"
        document.querySelector(".Bullets-Option .no").classList.add("active")
    }
}

//Create Handle Active Function
function handleActive(ev) {
    //remove class active from all spans
        ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
            element.classList.remove("active")
        })
        
        //add class active to the bgOption (yes or no)
        ev.target.classList.add("active")
}

//Reset Button
document.querySelector(".setting-box button").onclick = function () {

    localStorage.removeItem("color_option")
    localStorage.removeItem("bgOption_item")
    localStorage.removeItem("bulletOption")

    window.location.reload(); //reload window
}

/////////////////////////////////////
// toggleMenu
let toggleMenueButton = document.querySelector(".toggle-menu")
let links = document.querySelector(".links")
toggleMenueButton.onclick = function (e) {

    //stop propagation
    e.stopPropagation()

    this.classList.toggle("menu-active")

    links.classList.toggle("open")
}

//click anywhere outside menu to close it
document.addEventListener("click", (e) => {
    if (e.target !== toggleMenueButton && e.target !== links) {

        if (links.classList.contains("open")) {
            toggleMenueButton.classList.toggle("menu-active")
            links.classList.toggle("open")
        }
    }
})

//stop propagation on menu
links.onclick = function (e) {
    e.stopPropagation()
}