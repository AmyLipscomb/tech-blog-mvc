document
    .getElementById("addapost")
    .addEventListener("submit", async function (event) {
        event.preventDefault();


        const blog_post_title = document.querySelector('input[name = "blog_post_title"]').value;

        const blog_post_content = document.querySelector('input[name = "blog_post_content"]').value;

        const blog_post_creator = document.querySelector('input[name = "blog_post_creator"]').value;

        const blog_post_date = document.querySelector('input[name = "blog_post_date"]').value;

        await fetch("/api/blogs", {
            method: "POST",
            body: JSON.stringify({
                blog_post_title,
                blog_post_content,
                blog_post_creator,
                blog_post_date
            }),
            headers: {
                "Content-Type": "application/json"
            },
        });

    });
