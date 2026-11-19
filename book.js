const pages = [
    `
        <h1 class="original-heading">Robert David Hatton</h1>

        <p>
            Date of birth: 17th June 1933 at 79 Uxbridge Road, Ealing, Middlesex.
        </p>

        <p>
            Parents: Henry David Percy Hatton and Edna Florence Hatton (Formerly Bourne).
        </p>

        <p>
            Residing at: 14 Manton Avenue, Hanwell, Ealing, Middlesex.
        </p>

        <p>
            Brother: Ernest Henry Hatton, born 30th May 1930, Died 24th January 2003.
        </p>

        <p>
            Obviously my first comments will not be from memory of the actual happenings, but from memories of what I was told.
        </p>
    `,

    `
        <h2 class="original-heading">My Family</h2>

        <p class="family-list">
            <strong>3 Generations</strong><br>
            Great Grandfather: Henry b.12/02/1844 d.20/12/24<br>
            Grandfather: Ernest Harry b.06/02/1879 d.13/12/1965<br>
            Father: Henry David Percy (Joe) b.08/08/1904 d.10/03/1985
        </p>

        <p>
            I thought that I should start my story by telling you about my Grand Parents and Parents. My Great Grandfather was Henry, My Grandfather was Ernest Harry, and My Dad was, Henry David Percy Hatton. Because he had the same first name as his Grand Father, he was nicknamed “Joe”. He did have a younger brother, Albert Mitchell born Sept 1908 who unfortunately died in his first year, 26/10/1909.
        </p>
    `,

    `
        <p>
            Dad met my Mum, Edna Florence Bourne, who lived next door at 114 Northumberland Park, Tottenham. She was the youngest girl of four, born 10/08/1910. She also had four brothers, so quite a large family.
        </p>

        <p>
            As things happen, she became pregnant, so they quickly got married at St. Paul's Church, Tottenham on 16/02/1930. They moved to 14 Manton Avenue, Ealing. My brother Ernest was born at 03.30hrs, 30/05/1930, in Harley House, Ealing West, now we understand why Mum & Dad never celebrated their Wedding Anniversary.
        </p>
    `,

    `
        <p>
            Three years later at 20.20hrs, 17/06/1933 I was born, also in Harley House. Mum had wanted her first born to be named Robert David but traditions dictated that the family name of Ernest Henry was used. I'm quite pleased that I ended up with Bob, only get called Robert when I'm in trouble.
        </p>

        <p>
            Dad had a job at a ‘Pawn Brokers’ where he learnt quite a lot about Precious Metals and Jewellery, he then followed his father into the ‘Gas Board’ where he worked as a Salesman. Although I was born in Ealing it was within my first year that we, as a family, moved to: 13 Dorchester Avenue, Palmers Green, London, N13.
        </p>
    `,

    `
        <p>
            This was just north of the ‘Cambridge Roundabout’ at the junction of the North Circular Road and the A10. I believe that this house was originally owned by my grandfather, Ernest Harry Hatton, or he was purchasing it. I don’t remember my Granddad living in this house, I think he must have sold it to my Mum and Dad and bought a bungalow at 222 Philmead Road, South Benfleet. Essex.
        </p>

        <p>
            I feel I should say a few words about my brother, Ernest Henry Hatton. He was born on the 30/05/1931. Being 3 years older than me meant that he always had older friends.
        </p>
    `,

    `
        <p>
            He failed his 11+ exam, so went to Silver Street School. However, he showed a desire to improve and was selected to transfer to Tottenham Technical College. He studied technical drawing and was able to get a job in the Edmonton Council in their Architects Office. Taking extra studies at Holloway College he obtained his A.R.I.B.A.
        </p>

        <p class="original-caption">
            Dad, Me and Ern
        </p>
    `
];

let currentPage = 0;
let turnDirection = "forward";

const beginButton = document.getElementById("begin-story");
const bookCover = document.querySelector(".book-cover");

beginButton.addEventListener("click", () => {
    bookCover.classList.add("opening");

    setTimeout(() => {
        showReader();
    }, 700);
});

function showReader() {
    document.body.innerHTML = `
        <main class="reader">
            <section class="page" id="book-page">

                <div class="paper-text" id="page-content"></div>

                <nav class="navigation" aria-label="Book navigation">
                    <button
                        type="button"
                        id="previous-page"
                        aria-label="Previous page">
                        ← Previous
                    </button>

                    <span id="page-number" aria-live="polite"></span>

                    <button
                        type="button"
                        id="next-page"
                        aria-label="Next page">
                        Next →
                    </button>
                </nav>

            </section>
        </main>
    `;

    document
        .getElementById("previous-page")
        .addEventListener("click", previousPage);

    document
        .getElementById("next-page")
        .addEventListener("click", nextPage);

    document.addEventListener("keydown", handleKeyboard);

    renderPage(false);
}

function renderPage(animate = true) {
    const pageElement = document.getElementById("book-page");
    const contentElement = document.getElementById("page-content");

    const updateContent = () => {
        contentElement.innerHTML = pages[currentPage];

        document.getElementById("page-number").textContent =
            `${currentPage + 1} / ${pages.length}`;

        document.getElementById("previous-page").disabled =
            currentPage === 0;

        document.getElementById("next-page").disabled =
            currentPage === pages.length - 1;
    };

    if (!animate) {
        updateContent();
        return;
    }

    pageElement.classList.remove(
        "turn-forward-out",
        "turn-forward-in",
        "turn-back-out",
        "turn-back-in"
    );

    const outClass =
        turnDirection === "forward"
            ? "turn-forward-out"
            : "turn-back-out";

    const inClass =
        turnDirection === "forward"
            ? "turn-forward-in"
            : "turn-back-in";

    pageElement.classList.add(outClass);

    setTimeout(() => {
        updateContent();

        pageElement.classList.remove(outClass);
        pageElement.classList.add(inClass);

        setTimeout(() => {
            pageElement.classList.remove(inClass);
        }, 420);
    }, 360);
}

function nextPage() {
    if (currentPage < pages.length - 1) {
        turnDirection = "forward";
        currentPage++;
        renderPage();
    }
}

function previousPage() {
    if (currentPage > 0) {
        turnDirection = "back";
        currentPage--;
        renderPage();
    }
}

function handleKeyboard(event) {
    if (event.key === "ArrowRight") {
        nextPage();
    }

    if (event.key === "ArrowLeft") {
        previousPage();
    }
}
