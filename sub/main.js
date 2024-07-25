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

let add_room_box = document.querySelector(".post-box");
// add_room_box.style.display = "none";

function post()
{
    console.log(add_room_box.style.display);
    
    if(add_room_box.style.display == "flex")
    {
        add_room_box.style.animation = "post-box-out 300ms forwards";
        setTimeout(()=>{add_room_box.style.display = "none"}, 300)

    }else
    {
        add_room_box.style.animation = "post-animation 300ms forwards";
        setTimeout(()=>{add_room_box.style.display = "flex"}, 300)
    }


}