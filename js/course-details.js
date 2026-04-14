// Get course ID from URL
const urlParams = new URLSearchParams(window.location.search);
const courseId = parseInt(urlParams.get('id'));

// Find course from coursesData
const course = coursesData.find(c => c.id === courseId);

if (!course) {
    window.location.href = 'courses.html';
} else {
    loadCourseDetails();
}

function loadCourseDetails() {
    // Update page title
    document.title = `${course.title} - LearnDepth`;
    
    // Update breadcrumb
    document.getElementById('breadcrumbTitle').textContent = course.title;
    
    // Update course header
    document.getElementById('courseTitle').textContent = course.title;
    document.getElementById('courseShortDesc').textContent = course.description;
    document.getElementById('courseRating').textContent = course.rating;
    document.getElementById('courseStudents').textContent = course.students;
    document.getElementById('courseDuration').textContent = course.duration;
    document.getElementById('courseLevel').textContent = course.level;
    
    // Update course description
    document.getElementById('courseDescription').textContent = course.description + '. This comprehensive course is designed to take you from beginner to advanced level with hands-on projects and real-world examples. You will learn industry best practices and gain practical skills that you can apply immediately.';
    
    // Update course modules
    const modulesHTML = generateModules(course.modules);
    document.getElementById('courseModules').innerHTML = modulesHTML;
    
    // Update instructor
    document.getElementById('instructorName').textContent = course.instructor;
    document.getElementById('instructorAvatar').textContent = course.instructor.charAt(0);
    document.getElementById('instructorBio').textContent = `${course.instructor} is an experienced professional with extensive knowledge in ${course.category}. With years of industry experience, they bring real-world insights and practical expertise to help students master the subject.`;
    
    // Update sidebar
    document.getElementById('courseImage').src = course.image;
    document.getElementById('coursePrice').textContent = course.price === 0 ? 'FREE' : `₹ ${course.price}`;
    document.getElementById('priceLabel').textContent = course.price === 0 ? 'Enroll for free' : 'One-time payment';
    document.getElementById('videoDuration').textContent = course.duration.replace(' Hrs', '');
    document.getElementById('moduleCount').textContent = course.modules;
}

function generateModules(count) {
    const moduleTopics = [
        'Introduction and Getting Started',
        'Core Concepts and Fundamentals',
        'Advanced Techniques',
        'Practical Applications',
        'Best Practices and Patterns',
        'Real-World Projects',
        'Testing and Debugging',
        'Performance Optimization',
        'Security Considerations',
        'Deployment and Production',
        'Advanced Topics',
        'Case Studies',
        'Industry Standards',
        'Tools and Resources',
        'Final Project',
        'Certification Preparation',
        'Bonus Content',
        'Q&A and Support',
        'Community Resources',
        'Career Guidance'
    ];
    
    let html = '';
    for (let i = 1; i <= count; i++) {
        const topic = moduleTopics[i - 1] || `Module ${i} Content`;
        const lessons = Math.floor(Math.random() * 5) + 3;
        const duration = Math.floor(Math.random() * 40) + 20;
        
        html += `
            <div class="module-item">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 class="mb-2">Module ${i}: ${topic}</h5>
                        <p class="text-muted mb-0">
                            <i class="fa fa-play-circle me-2"></i>${lessons} lessons
                            <i class="fa fa-clock ms-3 me-2"></i>${duration} minutes
                        </p>
                    </div>
                    <div>
                        <i class="fa fa-chevron-down"></i>
                    </div>
                </div>
            </div>
        `;
    }
    return html;
}

function enrollCourse() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (!isLoggedIn) {
        alert('Please login to enroll in this course');
        window.location.href = 'login.html';
        return;
    }
    
    if (course.price === 0) {
        alert(`Successfully enrolled in "${course.title}"! Check your dashboard to start learning.`);
        // Here you would typically save the enrollment to the database
    } else {
        alert(`Proceeding to payment for "${course.title}" - ₹${course.price}`);
        // Here you would typically redirect to payment gateway
    }
}

function addToWishlist() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (!isLoggedIn) {
        alert('Please login to add courses to your wishlist');
        window.location.href = 'login.html';
        return;
    }
    
    alert(`"${course.title}" added to your wishlist!`);
    // Here you would typically save to wishlist in database
}
