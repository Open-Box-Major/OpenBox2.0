let toggle = document.querySelector("#checkbox")
let navContent = document.querySelector(".navbar-content")
toggle.addEventListener("click", (e)=>{
    console.log(toggle.checked)
    if(toggle.checked)
    {
        navContent.style.transform = "translateX(0%)"
    }else
        navContent.style.transform = "translateX(100%)"

})