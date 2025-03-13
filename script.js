


// For Thumb Button
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll(".post").forEach(post => {
        const postId = post.id;
        const ratings = post.querySelectorAll(".post-rating");

        ratings.forEach(rating => {
            const button = rating.querySelector(".post-rating-button");
            const count = rating.querySelector(".post-rating-count");

            button.addEventListener("click", async () => {
                if (button.textContent === 'thumb_up' || button.textContent === 'thumb_down') {
                    animateButton(button);
                }

                if (rating.classList.contains("post-rating-selected")) {
                    return;
                }

                incrementCounter(count);

                ratings.forEach(otherRating => {
                    if (otherRating !== rating && otherRating.classList.contains("post-rating-selected")) {
                        const otherCount = otherRating.querySelector(".post-rating-count");
                        otherCount.textContent = Math.max(0, Number(otherCount.textContent) - 1);
                        otherRating.classList.remove("post-rating-selected");
                    }
                });

                rating.classList.add("post-rating-selected");

                const likeOrDislike = button.textContent === 'thumb_up' ? "like" : "dislike";
                const response = await fetch(`/posts/${postId}/${likeOrDislike}`);
                const body = await response.json();
            });
        });
    });

    function animateButton(button) {
        button.classList.add('clicked');
        setTimeout(() => {
            button.classList.remove('clicked');
        }, 500);
    }

    function incrementCounter(counterElement) {
        let count = parseInt(counterElement.textContent);
        count++;
        counterElement.textContent = count;

        counterElement.classList.add('bounce');
        setTimeout(() => {
            counterElement.classList.remove('bounce');
        }, 500);
    }
});