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
    let keyRef =  ref(database, "posts/");
    get(keyRef).then((snapshot) =>{
        const data = snapshot.val();
        let id = 0;
        if(data)
            id = Object.keys(data).at(-1) + 1;

        let obj = {};
        obj["subject"] = subject;
        obj["body"] = body;
        obj["likes"] = 0;
        obj["dislikes"] = 0;
        obj["comment"] = 0;
        obj["time"] = Date();
        obj["visible"] = false;
        
        if(body != "" && subject != ""){
            set(ref(database,`posts/${id}`, ), obj);
            console.log("post added")
        }
        
        console.log(data)
        console.log(id)
    })
}


function fetchPost(){
    let keyRef = ref(database, "posts/");
    onValue(keyRef, (snapshot) =>{
        let data = snapshot.val();
        let msgBox = document.querySelector(".msg-box");
        msgBox.innerHTML = "";
        Object.keys(data).forEach((key) => {
            let post = data[key];
            if(post["visible"])
                appendMessageCard(post["subject"], post["time"], post["body"], post["likes"], post["dislikes"], post["comment"]);
        })
    })
}

fetchPost();
// ---------------------------------------------------------------------------------------------

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear(); // Get full year
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-based) and add leading zero
    const day = String(date.getDate()).padStart(2, '0'); // Get day and add leading zero if necessary

    return `${year}/${month}/${day}`;
}

function appendMessageCard(subject, date, body, likes, dislikes, shares) {
    // Create the main msg-card div
    const msgCard = document.createElement('div');
    msgCard.className = 'msg-card';

    // Create the anchor div
    const anchorDiv = document.createElement('div');
    anchorDiv.className = 'anchor';
    msgCard.appendChild(anchorDiv);

    // Create the msg-head div
    const msgHead = document.createElement('div');
    msgHead.className = 'msg-head';

    // Create and append the subject and date paragraphs
    const subjectParagraph = document.createElement('p');
    subjectParagraph.textContent = subject;
    const dateParagraph = document.createElement('p');
    dateParagraph.textContent = formatDate(date);

    msgHead.appendChild(subjectParagraph);
    msgHead.appendChild(dateParagraph);

    msgCard.appendChild(msgHead);

    // Create the msg-body div
    const msgBody = document.createElement('div');
    msgBody.className = 'msg-body';

    // Create and append the body paragraph
    const bodyParagraph = document.createElement('p');
    bodyParagraph.textContent = body;
    msgBody.appendChild(bodyParagraph);

    msgCard.appendChild(msgBody);

    // Create the msg-foot div
    const msgFoot = document.createElement('div');
    msgFoot.className = 'msg-foot';

    // Create the msg-likes div
    const msgLikes = document.createElement('div');
    msgLikes.className = 'msg-likes';

    // Create and append the likes elements
    const likeImg = document.createElement('img');
    likeImg.src = '../assets/okay.png';
    const likesParagraph = document.createElement('p');
    likesParagraph.textContent = likes;

    const dislikeImg = document.createElement('img');
    dislikeImg.src = '../assets/dislike.png';
    const dislikesParagraph = document.createElement('p');
    dislikesParagraph.textContent = dislikes;

    msgLikes.appendChild(likeImg);
    msgLikes.appendChild(likesParagraph);
    msgLikes.appendChild(dislikeImg);
    msgLikes.appendChild(dislikesParagraph);

    // Append msg-likes to msg-foot
    msgFoot.appendChild(msgLikes);

    // Create the shares div
    const sharesDiv = document.createElement('div');
    sharesDiv.className = 'shares';

    // Create and append the shares elements
    const shareImg = document.createElement('img');
    shareImg.src = '../assets/send.png';
    const sharesParagraph = document.createElement('p');
    sharesParagraph.textContent = shares;

    sharesDiv.appendChild(shareImg);
    sharesDiv.appendChild(sharesParagraph);

    // Append shares to msg-foot
    msgFoot.appendChild(sharesDiv);

    // Append msg-foot to msg-card
    msgCard.appendChild(msgFoot);

    // Append the msg-card to msg box

    document.querySelector(".msg-box").appendChild(msgCard);
}
