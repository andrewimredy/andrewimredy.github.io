function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const mainPic = document.getElementById("main-img");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    const images = [
        "pictures/img_0089.webp",
        "pictures/IMG_1974.webp",
        "pictures/IMG_2615.webp",
        "pictures/IMG_2617.webp",
        "pictures/IMG_3094.webp",
        "pictures/IMG_3491.webp",
        "pictures/IMG_3661.webp",
        "pictures/IMG_3688.webp",
        "pictures/IMG_3721.webp",
        "pictures/IMG_3753.webp",
        "pictures/IMG_3913.webp",
        "pictures/IMG_3945.webp",
        "pictures/IMG_3974.webp",
        "pictures/IMG_3991.webp",
        "pictures/IMG_3995.webp",
        "pictures/IMG_4119.webp",
        "pictures/IMG_4197.webp",
        "pictures/IMG_4463.webp",
        "pictures/IMG_4480.webp",
        "pictures/IMG_6895.webp",
        "pictures/img_1477.webp",
        "pictures/img_1656.webp",
        "pictures/IMG_5074.webp",
        "pictures/IMG_5027.webp",
        "pictures/IMG_5083.webp",
        "pictures/IMG_5103.webp",
        "pictures/IMG_5112.webp"
    ];

    shuffle(images);

    let currentIndex = 0;

    // Helper function to update the main image
    function updateImage(index) {
        mainPic.src = images[index];
        mainPic.setAttribute("data-index", index);
    }

    // Event listeners for desktop navigation
    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage(currentIndex);
    });

    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage(currentIndex);
    });


    // Initialize the slideshow
    updateImage(currentIndex);
});

document.addEventListener('DOMContentLoaded', function() {
    const mainImg = document.getElementById('main-img');
    const modal = document.getElementById('img-modal');
    const modalImg = document.getElementById('modal-img');
    const modalBg = document.querySelector('.modal-bg');

    if (mainImg && modal && modalImg && modalBg) {
        mainImg.addEventListener('click', function() {
            // Only show modal on desktop (not mobile)
            if (window.innerWidth > 1000) {
                modal.classList.add('show');
                modalImg.src = mainImg.src;
                modalImg.alt = mainImg.alt;
            }
        });

        modalBg.addEventListener('click', function() {
            modal.classList.remove('show');
        });
    }
});