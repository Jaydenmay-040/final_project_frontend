function dropdown() {
    document.getElementById("dropdown_content").style.display = "none";
    document.getElementById("notification").style.display = "flex";
    // document.getElementById("notifications").style.display = "none";
}

function dropup() {
    document.getElementById("dropdown_content").style.display = "flex";
    document.getElementById("notification").style.display = "none";
    document.getElementById("notifications").style.display = "block";
}

document.querySelector('#comment').addEventListener('click', () => {
    document.getElementById('post_content').classList.toggle('active')
})

document.querySelector('#delete').addEventListener('click', () => {
    document.getElementById('post_content').classList.toggle('active')
})