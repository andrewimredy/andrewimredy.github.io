document.addEventListener("DOMContentLoaded", () => {
    const slideshow = document.getElementById("slideshow");
    const images = [
        "pictures/IMG_2269.jpeg",
        "pictures/IMG_2536.jpeg",
        "pictures/IMG_2617.jpeg"
        // Add more image paths here if needed
    ];

    // Randomize the image order
    const shuffledImages = images.sort(() => Math.random() - 0.5);

    // Create image elements and add them to the slideshow
    shuffledImages.forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.classList.add("pic");
        if (index === 0) img.classList.add("active"); // Set the first image as active
        slideshow.appendChild(img);
    });

    let currentIndex = 0;
    const imageElements = document.querySelectorAll("#slideshow img");

    // Function to show the next image
    const showImage = (index) => {
        imageElements.forEach((img, i) => {
            img.classList.toggle("active", i === index);
        });
    };

    // Navigation buttons
    document.getElementById("prev").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + imageElements.length) % imageElements.length;
        showImage(currentIndex);
    });

    document.getElementById("next").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % imageElements.length;
        showImage(currentIndex);
    });

    // Automatic slideshow
    setInterval(() => {
        currentIndex = (currentIndex + 1) % imageElements.length;
        showImage(currentIndex);
    }, 5000); // 5 seconds
});
