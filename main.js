// calling the html tags

let form = document.getElementById("form");
let addNew = document.getElementById("addNew");
let input = document.getElementById("input");
let date = document.getElementById("date");
let textarea = document.getElementById("textarea");
let errorMsg = document.querySelector(".error");
let close = document.getElementById("close");
let tasks = document.getElementById("tasks");

addNew.addEventListener("click", () => {
    form.classList.remove("active");
    form.style.top = "20px";
});

// close the form
close.addEventListener("click",()=> {
    form.classList.add("active");
    errorMsg.innerHTML = "";
})

form.addEventListener("submit",(e) => {
    e.preventDefault();
    formValidation();
})

let formValidation =() => {
    if(textarea.value.trim() === "") {
        errorMsg.innerHTML = "Can't be blank";
    }
    else {
        errorMsg.innerHTML = "";
        acceptData();
    }
}

let data = [];

let acceptData=() => {
    data.push({
        text : input.value,
        date : date.value,
        description : textarea.value,
    })
    
    localStorage.setItem("data",JSON.stringify(data));

    updateData();
    form.classList.add("active");
}

let updateData=() => {
    tasks.innerHTML = "";
    data.map((x,y) => {
        tasks.innerHTML += `
            <div id=${y}>
                <span class="fw-bold">${x.text}</span>
                <span class="c-grey">${x.date}</span>
                <p>${x.description}</p>
                <div class="options flex-center gap-20 cur-pointer">
                    <i onclick="editCards(this)" class="fas fa-edit"></i>
                    <i onclick="deleteCards(this); updateData()" class="fas fa-trash-alt"></i>
                </div>
            </div>
    `;
    })
    
    input.value = "";
    date.value = "";
    textarea.value = "";
}

let deleteCards=(e) => {
    
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data",JSON.stringify(data));
}

let editCards=(e) => {
    form.style.top = "20px";
    let selected = e.parentElement.parentElement;

    input.value = selected.children[0].innerHTML;
    date.value = selected.children[1].innerHTML;
    textarea.value = selected.children[2].innerHTML;
    
    deleteCards(e);
    form.classList.remove('active')
    
}

(()=> {
    data = JSON.parse(localStorage.getItem("data")) || [];
    updateData();
})()