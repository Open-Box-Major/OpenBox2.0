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

let post_box = document.querySelector(".post-box");
post_box.style.display = "none";

function post()
{
    console.log(post_box.style.display);
    
    if(post_box.style.display == "flex")
    {
        post_box.style.animation = "post-box-out 300ms forwards";
        setTimeout(()=>{post_box.style.display = "none"}, 300)

    }else
    {
        post_box.style.animation = "post-animation 300ms forwards";
        setTimeout(()=>{post_box.style.display = "flex"}, 300)
    }


}