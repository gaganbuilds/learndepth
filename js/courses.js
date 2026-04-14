// Course data mapping for accurate filtering
const courseData = {
    'AI & Machine Learning': { category: 'AI', level: 'Intermediate', price: 0 },
    'Java Programming': { category: 'Programming', level: 'Beginner', price: 0 },
    'Python Programming': { category: 'Programming', level: 'Beginner', price: 0 },
    'Web Development': { category: 'Web Development', level: 'Beginner', price: 0 },
    'App Development': { category: 'App Development', level: 'Intermediate', price: 0 }
};


// Initialize course cards with proper data attributes
function initializeCourses() {
    const courseCards = document.querySelectorAll('#coursesContainer > div');
    
    courseCards.forEach(card => {
        const titleElement = card.querySelector('h5');
        if (titleElement) {
            const title = titleElement.textContent.trim();
            const data = courseData[title];
            
            if (data) {
                card.setAttribute('data-category', data.category);
                card.setAttribute('data-level', data.level);
                card.setAttribute('data-price', data.price);
            }
        }
    });
}

// Filter courses based on search and dropdown selections
function filterCourses() {
    const category = document.getElementById('categoryFilter').value;
    const level = document.getElementById('levelFilter').value;
    const price = document.getElementById('priceFilter').value;
    const search = document.getElementById('searchInput').value.toLowerCase();

    const courseCards = document.querySelectorAll('#coursesContainer > div');
    let visibleCount = 0;

    courseCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const cardLevel = card.getAttribute('data-level');
        const cardPrice = card.getAttribute('data-price');
        const cardTitle = card.querySelector('h5')?.textContent.toLowerCase() || '';

        const matchCategory = category === 'all' || cardCategory === category;
        const matchLevel = level === 'all' || cardLevel === level;
        const matchPrice = price === 'all' || 
                          (price === 'free' && cardPrice === '0') || 
                          (price === 'paid' && cardPrice !== '0');
        const matchSearch = search === '' || cardTitle.includes(search);

        if (matchCategory && matchLevel && matchPrice && matchSearch) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    updateResultCount(visibleCount);
}

// Update result count display
function updateResultCount(count) {
    const resultText = count === 0 ? 'No courses found' : 
                      count === 1 ? 'Showing 1 course' : 
                      `Showing ${count} courses`;
    document.getElementById('resultCount').textContent = resultText;
}

// Filter by category from category cards
function filterByCategory(category) {
    document.getElementById('categoryFilter').value = category;
    document.getElementById('levelFilter').value = 'all';
    document.getElementById('priceFilter').value = 'all';
    document.getElementById('searchInput').value = '';
    filterCourses();
    document.getElementById('coursesSection').scrollIntoView({ behavior: 'smooth' });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeCourses();
    const courseCards = document.querySelectorAll('#coursesContainer > div');
    updateResultCount(courseCards.length);
});
