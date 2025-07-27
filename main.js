let currentPage = 1;
const postsPerPage = 3;
let allPosts = [];

document.addEventListener('DOMContentLoaded', () => {
  fetch('posts/index.json')
    .then(res => res.json())
    .then(posts => {
      allPosts = posts;
      renderPosts();
    });

  document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderPosts();
    }
  });

  document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentPage < Math.ceil(allPosts.length / postsPerPage)) {
      currentPage++;
      renderPosts();
    }
  });
});

function renderPosts() {
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const paginatedPosts = allPosts.slice(start, end);

  const container = document.getElementById('posts');
  container.innerHTML = '';

  paginatedPosts.forEach(post => {
    const div = document.createElement('div');
    div.className = 'p-4 border rounded';
    div.innerHTML = `<h2 class="text-2xl font-semibold mb-2">${post.title}</h2>
                     <p>${post.excerpt}</p>
                     <a class="text-blue-600 underline" href="${post.url}">Read more</a>`;
    container.appendChild(div);
  });
}
