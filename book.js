const pages = [
    {
        chapter: "MY STORY",
        title: "Robert David Hatton",
        content: `
            <p>
                Date of birth: 17th June 1933 at
                79 Uxbridge Road, Ealing, Middlesex.
            </p>

            <p>
                Parents: Henry David Percy Hatton and
                Edna Florence Hatton (formerly Bourne).
            </p>

            <p>
                Residing at: 14 Manton Avenue,
                Hanwell, Ealing, Middlesex.
            </p>

            <p>
                Brother: Ernest Henry Hatton.
            </p>

            <p>
                Obviously my first comments will not be from
                memory of the actual happenings, but from
                memories of what I was told.
            </p>
        `
    },

    {
        chapter: "CHAPTER ONE",
        title: "My Family",
        content: `
            <p>
                I thought that I should start my story by telling
                you about my Grand Parents and Parents.
            </p>

            <p>
                My Great Grandfather was Henry, My Grandfather
                was Ernest Harry, and My Dad was Henry David
                Percy Hatton.
            </p>

            <p>
                Because he had the same first name as his Grand
                Father, he was nicknamed “Joe”.
            </p>

            <p>
                He did have a younger brother, Albert Mitchell,
                born Sept 1908 who unfortunately died in his
                first year, 26/10/1909.
            </p>
        `
    },

    {
        chapter: "MY FAMILY",
        title: "Mum & Dad",
        content: `
            <p>
                Dad met my Mum, Edna Florence Bourne, who lived
                next door at 114 Northumberland Park, Tottenham.
                She was the youngest girl of four, born 10/08/1910.
            </p>

            <p>
                She also had four brothers, so quite a large family.
            </p>

            <p>
                As things happen, she became pregnant, so they
                quickly got married at St. Paul's Church, Tottenham
                on 16/02/1930.
            </p>

            <p>
                They moved to 14 Manton Avenue, Ealing.
            </p>
        `
    },

    {
        chapter: "MY FAMILY",
        title: "My Arrival",
        content: `
            <p>
                My brother Ernest was born at 03.30hrs,
                30/05/1930, in Harley House, Ealing West.
            </p>

            <p>
                Now we understand why Mum & Dad never celebrated
                their Wedding Anniversary.
            </p>

            <p>
                Three years later at 20.20hrs, 17/06/1933 I was
                born, also in Harley House.
            </p>

            <p>
                Mum had wanted her first born to be named Robert
                David but traditions dictated that the family name
                of Ernest Henry was used.
            </p>

            <p>
                I'm quite pleased that I ended up with Bob, only
                get called Robert when I'm in trouble.
            </p>
        `
    },

    {
        chapter: "EARLY YEARS",
        title: "Palmers Green",
        content: `
            <p>
                Dad had a job at a ‘Pawn Brokers’ where he learnt
                quite a lot about Precious Metals and Jewellery.
            </p>

            <p>
                He then followed his father into the ‘Gas Board’
                where he worked as a Salesman.
            </p>

            <p>
                Although I was born in Ealing it was within my
                first year that we, as a family, moved to:
            </p>

            <p class="place">
                13 Dorchester Avenue<br>
                Palmers Green<br>
                London, N13
            </p>

            <p>
                I don't remember living anywhere other than
                13 Dorchester Avenue.
            </p>
        `
    }
];


let currentPage = 0;

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

                <div id="page-content"></div>

                <div class="navigation">

                    <button
                        type="button"
                        id="previous-page">
                        ← Previous
                    </button>

                    <span id="page-number"></span>

                    <button
                        type="button"
                        id="next-page">
                        Next →
                    </button>

                </div>

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

    renderPage();
}


function renderPage() {

    const page = pages[currentPage];
    const pageElement = document.getElementById("book-page");

    pageElement.classList.remove("page-turn");

    void pageElement.offsetWidth;

    pageElement.classList.add("page-turn");

    document.getElementById("page-content").innerHTML = `
        <p class="chapter-label">
            ${page.chapter}
        </p>

        <h1 class="page-title">
            ${page.title}
        </h1>

        <div class="page-divider"></div>

        <div class="story-text">
            ${page.content}
        </div>
    `;

    document.getElementById("page-number").textContent =
        `${currentPage + 1} / ${pages.length}`;

    document.getElementById("previous-page").disabled =
        currentPage === 0;

    document.getElementById("next-page").disabled =
        currentPage === pages.length - 1;
}


function nextPage() {

    if (currentPage < pages.length - 1) {
        currentPage++;
        renderPage();
    }
}


function previousPage() {

    if (currentPage > 0) {
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
