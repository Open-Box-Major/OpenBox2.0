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

let addPostToggle = document.querySelector("#addPostToggle");
addPostToggle.addEventListener("click", post)

let addPost = document.querySelector("#addPost")
addPost.addEventListener("click", (e) => {
    let subject = document.querySelector("#post-subject");
    let content = document.querySelector("#post-content");
    writeNewPost( subject.value, content.value);
    post()
})



// -----------------------------DATABASE-----------------------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getDatabase, ref, set, get, child, onValue } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";


const firebaseConfig = {
databaseURL: "https://openbox-db-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

function getNewId(){
    let keyRef =  ref(database, "posts/");
    onValue(keyRef, (snapshot) =>{
        const data = snapshot.val();
        console.log(data);
    })
}

function writeNewPost(subject, body){
    // onValue(keyRef, (snapshot) =>{
        //     const data = snapshot.val();
        // let id = data.length;
        // console.log(obj)
        // console.log("post added")
        // })
        let keyRef =  ref(database, "posts/");
        get(keyRef).then((snapshot) =>{
            const data = snapshot.val();
            let id = 0;
            if(data)
                id = data.length;

            let obj = {};
            obj["subject"] = subject;
            obj["body"] = body;
            obj["likes"] = 0;
            obj["dislikes"] = 0;
            obj["comment"] = 0;
            obj["time"] = Date();
            obj["visible"] = false;
            
            set(ref(database,`posts/${id}`, ), obj);
            
    
        // set(ref(database, "posts/", ), obj);
        console.log(data)
        console.log("post added")
    })
}
