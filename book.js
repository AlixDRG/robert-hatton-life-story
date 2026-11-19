const storyBlocks = [
    {
        type: "heading",
        text: "Robert David Hatton"
    },
    {
        type: "paragraph",
        text: "Date of birth: 17th June 1933 at 79 Uxbridge Road, Ealing, Middlesex."
    },
    {
        type: "paragraph",
        text: "Parents: Henry David Percy Hatton and Edna Florence Hatton (Formerly Bourne)."
    },
    {
        type: "paragraph",
        text: "Residing at: 14 Manton Avenue, Hanwell, Ealing, Middlesex."
    },
    {
        type: "paragraph",
        text: "Brother: Ernest Henry Hatton, born 30th May 1930, Died 24th January 2003."
    },
    {
        type: "paragraph",
        text: "Obviously my first comments will not be from memory of the actual happenings, but from memories of what I was told."
    },
    {
        type: "subheading",
        text: "My Family"
    },
    {
        type: "family",
        lines: [
            "3 Generations",
            "Great Grandfather: Henry b.12/02/1844 d.20/12/24",
            "Grandfather: Ernest Harry b.06/02/1879 d.13/12/1965",
            "Father: Henry David Percy (Joe) b.08/08/1904 d.10/03/1985"
        ]
    },
    {
        type: "paragraph",
        text: "I thought that I should start my story by telling you about my Grand Parents and Parents. My Great Grandfather was Henry, My Grandfather was Ernest Harry, and My Dad was, Henry David Percy Hatton. Because he had the same first name as his Grand Father, he was nicknamed “Joe”. He did have a younger brother, Albert Mitchell born Sept 1908 who unfortunately died in his first year, 26/10/1909."
    },
    {
        type: "paragraph",
        text: "Dad met my Mum, Edna Florence Bourne, who lived next door at 114 Northumberland Park, Tottenham. She was the youngest girl of four, born 10/08/1910. She also had four brothers, so quite a large family."
    },
    {
        type: "paragraph",
        text: "As things happen, she became pregnant, so they quickly got married at St. Paul's Church, Tottenham on 16/02/1930. They moved to 14 Manton Avenue, Ealing. My brother Ernest was born at 03.30hrs, 30/05/1930, in Harley House, Ealing West, now we understand why Mum & Dad never celebrated their Wedding Anniversary. Three years later at 20.20hrs, 17/06/1933 I was born, also in Harley House. Mum had wanted her first born to be named Robert David but traditions dictated that the family name of Ernest Henry was used. I'm quite pleased that I ended up with Bob, only get called Robert when I'm in trouble."
    },
    {
        type: "paragraph",
        text: "Dad had a job at a ‘Pawn Brokers’ where he learnt quite a lot about Precious Metals and Jewellery, he then followed his father into the ‘Gas Board’ where he worked as a Salesman. Although I was born in Ealing it was within my first year that we, as a family, moved to: 13 Dorchester Avenue, Palmers Green, London, N13."
    },
    {
        type: "paragraph",
        text: "This was just north of the ‘Cambridge Roundabout’ at the junction of the North Circular Road and the A10. I believe that this house was originally owned by my grandfather, Ernest Harry Hatton, or he was purchasing it. I don’t remember my Granddad living in this house, I think he must have sold it to my Mum and Dad and bought a bungalow at 222 Philmead Road, South Benfleet. Essex."
    },
    {
        type: "paragraph",
        text: "I feel I should say a few words about my brother, Ernest Henry Hatton. He was born on the 30/05/1931. Being 3 years older than me meant that he always had older friends. He failed his 11+ exam, so went to Silver Street School. However, he showed a desire to improve and was selected to transfer to Tottenham Technical College. He studied technical drawing and was able to get a job in the Edmonton Council in their Architects Office. Taking extra studies at Holloway College he obtained his A.R.I.B.A."
    },
    {
        type: "caption",
        text: "Dad, Me and Ern"
    }
];

let pages = [];
let currentPage = 0;
let isTurning = false;

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
            <div class="page-stage">

                <section class="page" id="book-page">
                    <div class="paper-text" id="page-content"></div>
                    <span class="printed-page-number" id="printed-page-number"></span>
                </section>

            </div>

            <nav class="reader-navigation" aria-label="Book navigation">
                <button
                    type="button"
                    id="previous-page"
                    aria-label="Previous page">
                    ← Previous
                </button>

                <span id="page-progress" aria-live="polite"></span>

                <button
                    type="button"
                    id="next-page"
                    aria-label="Next page">
                    Next →
                </button>
            </nav>
        </main>

        <div class="pagination-measurement" aria-hidden="true">
            <div class="paper-text" id="measurement-content"></div>
        </div>
    `;

    document
        .getElementById("previous-page")
        .addEventListener("click", previousPage);

    document
        .getElementById("next-page")
        .addEventListener("click", nextPage);

    document.addEventListener("keydown", handleKeyboard);

    requestAnimationFrame(() => {
        pages = paginateStory();
        currentPage = 0;
        renderPage(false);
    });
}

function createBlockElement(block, textOverride = null) {
    let element;

    if (block.type === "heading") {
        element = document.createElement("h1");
        element.className = "original-heading";
        element.textContent = textOverride ?? block.text;
    }

    if (block.type === "subheading") {
        element = document.createElement("h2");
        element.className = "original-heading";
        element.textContent = textOverride ?? block.text;
    }

    if (block.type === "paragraph") {
        element = document.createElement("p");
        element.textContent = textOverride ?? block.text;
    }

    if (block.type === "caption") {
        element = document.createElement("p");
        element.className = "original-caption";
        element.textContent = textOverride ?? block.text;
    }

    if (block.type === "family") {
        element = document.createElement("p");
        element.className = "family-list";

        block.lines.forEach((line, index) => {
            if (index === 0) {
                const strong = document.createElement("strong");
                strong.textContent = line;
                element.appendChild(strong);
            } else {
                element.appendChild(document.createTextNode(line));
            }

            if (index < block.lines.length - 1) {
                element.appendChild(document.createElement("br"));
            }
        });
    }

    return element;
}

function paginateStory() {
    const measurement = document.getElementById("measurement-content");
    const generatedPages = [];

    measurement.innerHTML = "";

    let currentPageBlocks = [];

    function saveCurrentPage() {
        if (currentPageBlocks.length === 0) {
            return;
        }

        generatedPages.push(
            currentPageBlocks.map(item => ({
                block: item.block,
                text: item.text
            }))
        );

        currentPageBlocks = [];
        measurement.innerHTML = "";
    }

    storyBlocks.forEach(block => {
        const fullElement = createBlockElement(block);
        measurement.appendChild(fullElement);

        if (!isOverflowing(measurement)) {
            currentPageBlocks.push({
                block,
                text: block.text ?? null
            });

            return;
        }

        measurement.removeChild(fullElement);

        if (block.type !== "paragraph") {
            saveCurrentPage();

            measurement.appendChild(createBlockElement(block));

            currentPageBlocks.push({
                block,
                text: block.text ?? null
            });

            return;
        }

        let remainingWords = block.text.split(" ");

        while (remainingWords.length > 0) {
            const wordsThatFit = findWordsThatFit(
                measurement,
                block,
                remainingWords
            );

            if (wordsThatFit === 0) {
                saveCurrentPage();
                continue;
            }

            const pageText = remainingWords
                .slice(0, wordsThatFit)
                .join(" ");

            const paragraph = createBlockElement(block, pageText);
            measurement.appendChild(paragraph);

            currentPageBlocks.push({
                block,
                text: pageText
            });

            remainingWords = remainingWords.slice(wordsThatFit);

            if (remainingWords.length > 0) {
                saveCurrentPage();
            }
        }
    });

    saveCurrentPage();

    return generatedPages;
}

function findWordsThatFit(container, block, words) {
    let low = 1;
    let high = words.length;
    let bestFit = 0;

    while (low <= high) {
        const middle = Math.floor((low + high) / 2);
        const testText = words.slice(0, middle).join(" ");
        const testElement = createBlockElement(block, testText);

        container.appendChild(testElement);

        if (!isOverflowing(container)) {
            bestFit = middle;
            low = middle + 1;
        } else {
            high = middle - 1;
        }

        container.removeChild(testElement);
    }

    return bestFit;
}

function isOverflowing(element) {
    return element.scrollHeight > element.clientHeight + 1;
}

function renderPage(animate = true, direction = "forward") {
    if (isTurning || pages.length === 0) {
        return;
    }

    const pageElement = document.getElementById("book-page");

    if (!animate) {
        displayCurrentPage();
        return;
    }

    isTurning = true;

    const outClass =
        direction === "forward"
            ? "page-turn-forward-out"
            : "page-turn-back-out";

    const inClass =
        direction === "forward"
            ? "page-turn-forward-in"
            : "page-turn-back-in";

    pageElement.classList.add(outClass);

    setTimeout(() => {
        displayCurrentPage();

        pageElement.classList.remove(outClass);
        pageElement.classList.add(inClass);

        setTimeout(() => {
            pageElement.classList.remove(inClass);
            isTurning = false;
        }, 380);
    }, 320);
}

function displayCurrentPage() {
    const content = document.getElementById("page-content");
    content.innerHTML = "";

    pages[currentPage].forEach(item => {
        content.appendChild(
            createBlockElement(item.block, item.text)
        );
    });

    document.getElementById("printed-page-number").textContent =
        currentPage + 1;

    document.getElementById("page-progress").textContent =
        `${currentPage + 1} of ${pages.length}`;

    document.getElementById("previous-page").disabled =
        currentPage === 0;

    document.getElementById("next-page").disabled =
        currentPage === pages.length - 1;
}

function nextPage() {
    if (currentPage >= pages.length - 1 || isTurning) {
        return;
    }

    currentPage++;
    renderPage(true, "forward");
}

function previousPage() {
    if (currentPage <= 0 || isTurning) {
        return;
    }

    currentPage--;
    renderPage(true, "back");
}

function handleKeyboard(event) {
    if (event.key === "ArrowRight") {
        nextPage();
    }

    if (event.key === "ArrowLeft") {
        previousPage();
    }
}
