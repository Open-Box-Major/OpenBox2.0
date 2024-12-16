const createButton = document.querySelector(".create-button");
if(createButton){
    createButton.addEventListener("click", (e) =>{
        window.location.href = "./createForum.html";
    })
}

const generateForum = document.querySelector(".generate-forum");
if(generateForum){
    generateForum.addEventListener("click", (e) => {
        const obj = postInDb();
        console.log(obj);
        writeNewPost(obj);
        setTimeout(()=>{
            window.location.href = "./forum.html";
        }, 1000);
    })
}

function postInDb() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    const dynamicDivs = document.querySelectorAll('.dynamicDiv');
    const questions = [];

    dynamicDivs.forEach(div => {
        const questionText = div.querySelector('input[name="question"]')?.value;
        const optionType = div.querySelector('.optionType').value;

        if (optionType === 'text') {
            const textOption = div.querySelector('input[name="textOption"]')?.value;
            questions.push({
                type: 'text',
                question: questionText,
            });
        } else if (optionType === 'poll') {
            const pollOptions = Array.from(div.querySelectorAll('input[name="pollOption"]')).map(input => input.value);
            questions.push({
                type: 'poll',
                question: questionText,
                options: pollOptions
            });
        }
    });

    const formData = {
        title: title,
        description: description,
        questions: questions
    };

    console.log(JSON.stringify(formData, null, 2));
    alert('forum successfully created.');

   return formData;
}
// -----------------------------DATABASE-----------------------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getDatabase, ref, set, get, child, onValue } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";


const firebaseConfig = {
databaseURL: "https://openbox-forum-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

function getNewId(){
    let keyRef =  ref(database, "questions/");
    onValue(keyRef, (snapshot) =>{
        const data = snapshot.val();
        console.log(data);
    })
}
export function writeNewPost(obj){
    let keyRef =  ref(database, "questions/");
    get(keyRef).then((snapshot) =>{
        const data = snapshot.val();
        let id = 0;
        if(data)
            id = parseInt(Object.keys(data).at(-1)) + 1;

        if(obj){
            set(ref(database,`questions/${id}`, ), obj);
            console.log("post added")
        }
        
        console.log(data)
        console.log(id)
    })
}

function fetchForum(){
    let keyRef = ref(database, "questions/");
    onValue(keyRef, (snapshot) =>{
        let data = snapshot.val();
        Object.keys(data).forEach((id) => {
            const title = data[id]["title"];
            const desc = data[id]["description"];
            console.log(title);
            createForumCard(id, title, desc);
        })
    })
}


function createForumCard(id, title, description) {
    // Find the parent element with the class 'main-flex'
    const mainFlex = document.querySelector('.main-flex');

    // Create the forum-card div
    const forumCard = document.createElement('div');
    forumCard.className = 'forum-card';
    forumCard.id = id;

    // Create the image container and image element
    const imgContainer = document.createElement('div');
    const imgElement = document.createElement('img');
    imgElement.src = 'https://www.cta.org/wp-content/uploads/2020/03/empty-classroom.jpg'; // Placeholder image
    imgContainer.appendChild(imgElement);

    // Create the text container
    const textContainer = document.createElement('div');
    const titleElement = document.createElement('h5');
    titleElement.textContent = title; // Set the title text
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description; // Set the description text

    // Append title and description to the text container
    textContainer.appendChild(titleElement);
    textContainer.appendChild(descriptionElement);

    // Append image container and text container to the forum-card
    forumCard.appendChild(imgContainer);
    forumCard.appendChild(textContainer);
    forumCard.addEventListener("click", (e) =>{
        gotToForum(id);
    })

    // Append the forum-card to the parent element (main-flex)
    mainFlex.appendChild(forumCard);
}


if(createButton){
    fetchForum();
}


function gotToForum(id){
    const queryString = `?id=${encodeURIComponent(id)}`;
    window.location.href = "./forumPage.html" + queryString;
}