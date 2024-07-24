function createMenuCard(name){
    let menu = document.querySelector(".menu-flex");
    let menuCard = document.createElement("div")
    menuCard.classList.add("menu-card")
    menuCard.innerHTML = name
    menu.appendChild(menuCard)
}

menuList = ["Fest", "Quantum-X", "Assignment help"]
menuList.forEach(name => {
    createMenuCard(name)
});

function createRoomCard(img, name, about){
    let roomFlex = document.querySelector(".rooms-flex")
    let roomCard = document.createElement("div")
    roomCard.classList.add("room-card")
    roomCard.innerHTML = `
                <div>
                    <img src = "${img}">
                </div>
                <div>
                    <h5>${name}</h5>
                    <p>${about}</p>
                </div>
    `
    roomFlex.appendChild(roomCard)
}

roomList = [
    {
        img : "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        name : "room 2",
        about : "this is another room in option"
    },
    {
        img : "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        name : "room 3",
        about : "one more room for temp check purpose"
    },
]
roomList.forEach(obj=>{
    createRoomCard(obj.img, obj.name, obj.about)
})


add_room_box = document.querySelector(".add-room-box")
add_room_box.style.display = "none";

function addRoom()
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

