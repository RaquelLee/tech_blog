const newPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#postTitle').value.trim();
  const content = document.querySelector('#postContent').value.trim();

  if (title && content) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        content: content
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};

document.querySelector('#create')
  .addEventListener('click', newPostHandler);