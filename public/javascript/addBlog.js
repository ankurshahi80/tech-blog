async function addABlog(event){
    event.preventDefault();
    const title = document.getElementById("add-title").value.trim();
    const content = document.getElementById('addContent').value.trim();
    console.log("listening", title, content);
    const response = await fetch('/api/blogs',{
        method: 'POST',
        body: JSON.stringify({
            title: title,
            blog_text: content
        }),
        headers: {
            'Content-Type':'application/json'
        }
    });

    if(response.ok){
        document.location.replace('/dashboard');
    } else {
        alert(response.status.text);
    }
}

document.getElementById('create').addEventListener('click', addABlog);