const createButton = document.querySelector(".create-button");
createButton.addEventListener("click", (e) => {
    const obj = postInDb();
    console.log(obj);
    writeNewPost(obj);
})

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
    alert('JSON object has been logged to the console.');

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

        // let obj = {};
        // obj["subject"] = subject;
        // obj["body"] = body;
        // obj["likes"] = 0;
        // obj["dislikes"] = 0;
        // obj["comment"] = 0;
        // obj["time"] = Date();
        // obj["visible"] = false;
        
        if(obj){
            set(ref(database,`questions/${id}`, ), obj);
            console.log("post added")
        }
        
        console.log(data)
        console.log(id)
    })
}