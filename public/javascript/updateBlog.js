async function updateBlog(event){
    event.preventDefault();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    const title = document.getElementById("update-title").value.trim();
    const content = document.getElementById('update-content').value.trim();
    console.log("listening", id, title, content);
    const response = await fetch(`/api/blogs/${id}`,{
        method: 'PUT',
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
};

document.getElementById('update-btn').addEventListener('click', updateBlog);
