let plus = document.querySelector(".plus");
let area = document.querySelector(".text-area");
let yesdelete = document.querySelector(".minus");
let delbtn = document.querySelectorAll(".delete-box");

let myid = 0;
plus.addEventListener("click", function (e) {
    let div = document.createElement("div");
    div.classList.add("added");
    div.setAttribute("id", myid)
    
    div.innerHTML = `<div class="content" id=${myid} spellcheck="false"></div>
    <div class="delete-box">
    <button id=${myid}> Delete </button>
    </div>`
    
    let content = div.querySelector(".content");
    content.addEventListener("click", function (e) {
        content.setAttribute("contenteditable", "true")
    })
    content.addEventListener("blur", function (e) {
        // updatelocal();
        content.setAttribute("contenteditable", "false")
        let arr = JSON.parse(localStorage.getItem("alldetails"));
        arr[e.target.id].text = e.target.outerText;
        localStorage.setItem("alldetails", JSON.stringify(arr))
    })
    
    let delbtn = div.querySelector("button");
    delbtn.addEventListener("click", function (e) {
        let arr = JSON.parse(localStorage.getItem("alldetails"));
        arr = arr.filter(obj => obj.id != e.target.id);
        localStorage.setItem("alldetails", JSON.stringify(arr))
        document.getElementById(e.target.id).remove();
    })
    
    let obj = { "id": myid, "text": "" };
    let arr = JSON.parse(localStorage.getItem("alldetails"));
    arr.push(obj);
    localStorage.setItem("alldetails", JSON.stringify(arr))
    myid++;
    area.append(div);
})

yesdelete.addEventListener("click", function (e) {
    area.innerHTML = "";
})


let search = document.getElementById("a404");
search.addEventListener("click", function (e) {
    if (e.target.getAttribute("data-typed") == "false") {
        e.target.setAttribute("data-typed", "true");
        e.target.textContent = "";
    }
})


let flag=false;
search.addEventListener("keyup",debouncing);
function handle (e){
    console.log(e);
    if(!e.target.textContent){      // if user keeps the search box empty then remove the dialogue
        if(document.querySelector(".suggest"))
        {document.querySelector(".suggest").remove();}
        flag=false;
        return;
    }
    let suggestions = JSON.parse(localStorage.getItem("alldetails"));
    let val = e.target.textContent;
    let earr = [];
    earr = suggestions.filter((data) => {
        return data.text.startsWith(val);
    });
    
    if(earr.length==0){
    }else{
        if(flag==false){
            flag=true;
            let div=document.createElement("div");
            div.classList.add("suggest");
            area.append(div);
        }
        document.querySelector(".suggest").innerHTML="";
        for (let i = 0; i < earr.length; i++) {
            let li = document.createElement("li");
            li.textContent = JSON.parse(JSON.stringify(earr[i].text));
            document.querySelector(".suggest").append(li);
        }
    }
}

// function debouncing(e){
//     let timer;
//     clearTimeout(timer);
//     timer=setTimeout(() => {
//         handle(e);
//     }, 1000);
// }