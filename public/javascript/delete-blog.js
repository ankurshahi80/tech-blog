async function deleteBlog(event){
    event.preventDefault();
    const response = await fetch(`/api/blogs/${id}`,{
        method: 'DELETE'
    });

    if(response.ok){
        document.location.replace('/dashboard');
    } else {
        alert(response.status.text);
    }
};

document.getElementById('delete-btn').addEventListener('click', deleteBlog);