// firebase



const firebaseConfig = {
    apiKey: "AIzaSyAM_6WbvXX5gEU6geWFbGiPO40dgfnwNkU",
    authDomain: "openbox-5e25b.firebaseapp.com",
    databaseURL: "https://openbox-5e25b-default-rtdb.firebaseio.com",
    projectId: "openbox-5e25b",
    storageBucket: "openbox-5e25b.appspot.com",
    messagingSenderId: "915721925737",
    appId: "1:915721925737:web:90d4a1427c830ea19fdef8",
    measurementId: "G-HEKESSPWNJ"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Set database variable
var database = firebase.database()



//update firebase

var contactFormDB = firebase.database().ref("Rooms/");

const saveMessages = (name,desc,time) => {
var newContactForm = contactFormDB.push();

newContactForm.set({
    name: name,
    desc: desc,
    time : time

});

// location.reload()

};


// roomList =[]

// function addRoom(img, name, about) {
//     // Create the room object
//     let room = {
//         img: img,
//         name: name,
//         about: about
//     };

//     // Append the room object to the roomList
//     location.reload()
// }





var user_ref = database.ref("Rooms/")
console.log("hii")
        user_ref.on('value', function(snapshot) {
        var yourObject = snapshot.val()



        const chatContainer = document.getElementById('roomsContainer');
        chatContainer.innerHTML = '';
        for (const key in yourObject) {
        
            if (yourObject.hasOwnProperty(key)) {
                // console.log("hello")
                console.log(yourObject[key].name,yourObject[key].desc)
            createRoomCard("https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",yourObject[key].name,yourObject[key].desc)
            }
        }
    
        })


        // console.log(roomList)

        // roomList.forEach(obj=>{
        //     createRoomCard(obj.img, obj.name, obj.about)
        // })




menuList = ["Mini Project", "Fest", "Quantum-X", "Assignment help"]
let activeMenu = 0;

function createMenuCard(name, index){
    let menu = document.querySelector(".menu-flex");
    let menuCard = document.createElement("div")
    menuCard.classList.add("menu-card")
    menuCard.innerHTML = name
    menuCard.id = `menu-card-${index}`
    menu.appendChild(menuCard)
}

function menuCardActivate(oldIndex, newIndex){
    let id = `menu-card-${oldIndex}`
    let menuCard = document.querySelector(`#${id}`);
    menuCard.style = "background-color : #E5CFF7; color : #5B0888;"

    id = `menu-card-${newIndex}`
    menuCard = document.querySelector(`#${id}`)
    menuCard.style = "background-color : #5B0888; color : white;"
    activeMenu = newIndex;
}


menuList.forEach((name, index) => {
    createMenuCard(name, index)
});
menuCardActivate(activeMenu, activeMenu);

document.querySelectorAll(".menu-card").forEach(card =>{
    card.addEventListener("click", (e)=>{
        let newIndex = card.id
        menuCardActivate(activeMenu ,newIndex.split("-")[2])
    })
});

function createRoomCard(img, name, about){
    let roomFlex = document.querySelector(".rooms-flex")
    let roomCard = document.createElement("div")
    roomCard.classList.add("room-card")
    roomCard.innerHTML = `
                <div onclick="window.location.href='./chatbox.html?room=${encodeURIComponent(name)}'" >
                    <img src = "${img}">
                </div>
                <div>
                    <h5>${name}</h5>
                    <p>${about}</p>
                </div>
    `
    roomFlex.appendChild(roomCard)
}



// roomList = [
//     {
//         img : "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//         name : "room 2",
//         about : "this is another room in option"
//     },
//     {
//         img : "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//         name : "room 3",
//         about : "one more room for temp check purpose"
//     },
// ]



add_room_box = document.querySelector(".add-room-box")
add_room_box.style.display = "none";

function addRoom()
{
    // console.log(add_room_box.style.display);
    if(add_room_box.style.display == "flex")
    {

        

        add_room_box.style.animation = "post-box-out 300ms forwards";
        setTimeout(()=>{add_room_box.style.display = "none"}, 300)

    }else
    {

        document.querySelector("#room-name").value = "";
        document.querySelector("#room-desc").value = "";
        add_room_box.style.animation = "post-animation 300ms forwards";
        setTimeout(()=>{add_room_box.style.display = "flex"}, 300)
    }


}


function Firebaseroom(){
    const now = new Date();
        let currtime = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
        
        let roomName = document.querySelector("#room-name").value.trim();
        let roomDesc = document.querySelector("#room-desc").value.trim();

        if(roomName.length > 15 || roomName.length == 0)
            alert("Room Name should be atleast one character and under or equal to 15 characters")
        else if(roomDesc.length > 25 || roomDesc.length == 0)
            alert("Room Description should be atleast one character and under or equal to 25 characters")
        else{
            console.log(roomName)
            saveMessages(roomName,roomDesc,currtime);
            add_room_box.style.animation = "post-box-out 300ms forwards";
                    setTimeout(()=>{add_room_box.style.display = "none"}, 300)
        }
    

}


