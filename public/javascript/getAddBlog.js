function newFormHandler(event) {
    event.preventDefault();
    console.log("newFormHandler");
    document.location.replace('dashboard/blog/add');
}

document.getElementById('new-post-btn').addEventListener('click', newFormHandler);