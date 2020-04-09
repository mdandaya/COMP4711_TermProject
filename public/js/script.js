

let currentpage = 0;

function previouspage() {
    if (currentpage > 0) {
        currentpage--;
    }
    console.log(currentpage);
    let newpage = "/?page=" + currentpage;

    window.location.href = newpage;
}

function nextpage() {
    currentpage++;
    console.log(currentpage);
    let newpage = "/?page=" + currentpage;

    window.location.href = newpage
}