let userLogin = Cookies.get("userEmail");
let userToken = Cookies.get("tokenSet");
greeting = document.getElementById("greeting");

if(userToken == undefined) {
    greeting.innerHTML = "No user is logged in";
    // let btn = document.createElement("button");
    // btn.setAttribute("id", "back-button");
    // document.getElementById("user-login").append(btn);
    // document.getElementById("back-button").innerHTML = "BACK TO LOGIN";
    // document.getElementById("back-button").addEventListener("click", function(backLogin){
    //     window.open("../index.html", "_self");
    // });

} else {
    greeting.innerHTML = "Welcome " + userLogin;

    getColor();
}

function getColor() {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let colorObjects = JSON.parse(this.responseText);
            document.getElementById("message").innerHTML = " ";

            let colorSection = document.getElementById("color-container");
            for(let i=0; i<colorObjects.data.length; i++) {
                let colorArea = document.createElement("article");
                colorSection.append(colorArea);
                let colorName = document.createElement("h1");
                let colorYear = document.createElement("h2");
                let colorInput = document.createElement("div");
                colorInput.setAttribute("class", "color");

                colorArea.append(colorName);
                colorArea.append(colorYear);
                colorArea.append(colorInput);

                colorName.innerHTML = "Name of Color: " + colorObjects.data[i].name;
                colorYear.innerHTML = "Year of Color: " + colorObjects.data[i].year;
                colorInput.style.backgroundColor = colorObjects.data[i].color;
            }
        } else if(this.readyState !=4) {
            document.getElementById("message").innerHTML = "LOADING!";
        } else {
            document.getElementById("message").innerHTML = "SOMETHING WENT WRONG!";
        }
    }

    ajax.open("GET", "https://reqres.in/api/unknown", true);
    ajax.send();
}

function clearCookie() {
    Cookies.remove("tokenSet");
    window.open("../index.html", "_self");
}
document.getElementById("logout").addEventListener("click", clearCookie);