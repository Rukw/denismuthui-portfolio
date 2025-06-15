// Blog post data structure
const blogPosts = {
    photography: {
        tips: [
            {
                id: 'mastering-manual-mode',
                title: 'Mastering Manual Mode: A Complete Guide',
                category: 'photography',
                subcategory: 'Tips & Tricks',
                type: 'blog',
                date: 'July 15, 2025',
                readTime: '10 min',
                description: 'Learn how to take full control of your camera settings and create stunning photographs in any lighting condition.',
                thumbnail: '../assets/imgs/camera-541213_640.jpg',
                url: '../blog/photography/tutorials/mastering-manual-mode.html',
                tags: ['Photography', 'Tutorial', 'Camera Settings', 'Manual Mode']
            }
        ]
    },
    // Add other categories here as needed
};

// Function to get posts by category and subcategory
function getPosts(category, subcategory = null) {
    if (!category) return [];
    
    if (subcategory) {
        return blogPosts[category]?.[subcategory] || [];
    }
    
    // If no subcategory specified, return all posts from the category
    const posts = [];
    for (const subcat in blogPosts[category]) {
        posts.push(...blogPosts[category][subcat]);
    }
    return posts;
}

// Function to create blog card HTML
function createBlogCard(post) {
    return `
        <article class="blog-card" data-category="${post.category}" data-subcategory="${post.subcategory}">
            <div class="blog-thumbnail">
                <img src="${post.thumbnail}" alt="${post.title}">
                <span class="blog-category">${post.subcategory.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="blog-date">${post.date}</span>
                    <span class="blog-type">
                        <i class="fas fa-${post.type === 'vlog' ? 'video' : 'file-alt'}"></i>
                        ${post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                    </span>
                </div>
                <h3>${post.title}</h3>
                <p>${post.description}</p>
                <a href="${post.url}" class="read-more">
                    ${post.type === 'vlog' ? 'Watch Now' : 'Read More'}
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </article>
    `;
}

// Function to render blog grid
function renderBlogGrid(container, category, subcategory = null) {
    const posts = getPosts(category, subcategory);
    if (!container) return;
    
    container.innerHTML = posts.map(post => createBlogCard(post)).join('');
}

// Export functions and data
window.blogData = {
    posts: blogPosts,
    getPosts,
    createBlogCard,
    renderBlogGrid
}; 