const beginButton = document.getElementById("begin-story");
const bookCover = document.querySelector(".book-cover");

beginButton.addEventListener("click", () => {

    bookCover.classList.add("opening");

    setTimeout(() => {

        document.body.innerHTML = `
            <main class="reader">

                <section class="page">

                    <p class="chapter-label">
                        MY STORY
                    </p>

                    <h1 class="page-title">
                        Robert David Hatton
                    </h1>

                    <div class="page-divider"></div>

                    <p>
                        Date of birth: 17th June 1933 at
                        79 Uxbridge Road, Ealing, Middlesex.
                    </p>

                    <p>
                        Parents: Henry David Percy Hatton and
                        Edna Florence Hatton.
                    </p>

                    <p>
                        Brother: Ernest Henry Hatton.
                    </p>

                    <p>
                        Obviously my first comments will not be
                        from memory of the actual happenings,
                        but from memories of what I was told.
                    </p>

                    <div class="navigation">

                        <button type="button" disabled>
                            ← Previous
                        </button>

                        <span>
                            Page 1
                        </span>

                        <button type="button" id="next-page">
                            Next →
                        </button>

                    </div>

                </section>

            </main>
        `;

    }, 700);

});
