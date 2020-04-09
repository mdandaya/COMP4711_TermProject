

let currentpage = 0;

function previouspage(data) {
    console.log("data--",data);
    if (currentpage > 0) {
        currentpage--;
    }
    console.log(currentpage);
    let newpage = "/?page=" + currentpage;

    // window.location.href = newpage;
}

function nextpage(data) {
    console.log("data--",data);

    currentpage++;
    console.log(currentpage);
    let newpage = "/?page=" + currentpage;

    // window.location.href = newpage
}

function goProfile(user){
    let newpage = "/profile/"+user;
    window.location.href=newpage;
}