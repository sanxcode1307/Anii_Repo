document.addEventListener("DOMContentLoaded", () => {

    const overlay =
        document.getElementById("openingOverlay");

    const scissors =
        document.getElementById("scissors");

    const cutPoint =
        document.getElementById("cutPoint");

    const successMessage =
        document.getElementById("successMessage");

    const enterCafe =
        document.getElementById("enterCafe");

    const skipOpening =
        document.getElementById("skipOpening");


    let dragging = false;

    let hasCut = false;

    let offsetX = 0;

    let offsetY = 0;


    /* =====================================================
       START DRAG
    ===================================================== */

    scissors.addEventListener(
        "pointerdown",
        (event) => {

            if (hasCut) return;

            dragging = true;

            scissors.setPointerCapture(
                event.pointerId
            );


            const rect =
                scissors.getBoundingClientRect();


            offsetX =
                event.clientX - rect.left;

            offsetY =
                event.clientY - rect.top;


            scissors.style.cursor =
                "grabbing";

        }
    );


    /* =====================================================
       MOVE SCISSORS
    ===================================================== */

    scissors.addEventListener(
        "pointermove",
        (event) => {

            if (!dragging || hasCut)
                return;


            const container =
                document.querySelector(
                    ".ribbon-container"
                );


            const containerRect =
                container.getBoundingClientRect();


            let x =
                event.clientX -
                containerRect.left -
                offsetX;


            let y =
                event.clientY -
                containerRect.top -
                offsetY;


            const maxX =
                containerRect.width -
                scissors.offsetWidth;


            const maxY =
                containerRect.height -
                scissors.offsetHeight;


            x =
                Math.max(
                    0,
                    Math.min(x, maxX)
                );


            y =
                Math.max(
                    0,
                    Math.min(y, maxY)
                );


            scissors.style.left =
                `${x}px`;


            scissors.style.top =
                `${y}px`;


            scissors.style.transform =
                "none";


            checkCut();

        }
    );


    /* =====================================================
       RELEASE
    ===================================================== */

    scissors.addEventListener(
        "pointerup",
        () => {

            if (!dragging)
                return;

            dragging = false;

            scissors.style.cursor =
                "grab";


            if (!hasCut) {

                returnToStart();

            }

        }
    );


    /* =====================================================
       CHECK CUT
    ===================================================== */

    function checkCut() {

        const scissorsRect =
            scissors.getBoundingClientRect();


        const cutRect =
            cutPoint.getBoundingClientRect();


        const scissorsCenterX =
            scissorsRect.left +
            scissorsRect.width / 2;


        const scissorsCenterY =
            scissorsRect.top +
            scissorsRect.height / 2;


        const cutCenterX =
            cutRect.left +
            cutRect.width / 2;


        const cutCenterY =
            cutRect.top +
            cutRect.height / 2;


        const distance =
            Math.sqrt(

                Math.pow(
                    scissorsCenterX -
                    cutCenterX,
                    2
                )

                +

                Math.pow(
                    scissorsCenterY -
                    cutCenterY,
                    2
                )

            );


        if (distance < 65) {

            performCut();

        }

    }


    /* =====================================================
       CUT
    ===================================================== */

    function performCut() {

        if (hasCut)
            return;


        hasCut = true;

        dragging = false;


        overlay.classList.add(
            "cut-complete"
        );


        scissors.style.pointerEvents =
            "none";


        setTimeout(() => {

            successMessage.classList.add(
                "show"
            );

            createConfetti();

        }, 700);

    }


    /* =====================================================
       RESET
    ===================================================== */

    function returnToStart() {

        scissors.style.transition =
            "left .5s ease, top .5s ease";


        scissors.style.left =
            "30px";


        scissors.style.top =
            "50%";


        scissors.style.transform =
            "translateY(-50%)";


        setTimeout(() => {

            scissors.style.transition =
                "";

        }, 500);

    }


    /* =====================================================
       CONFETTI
    ===================================================== */

    function createConfetti() {

        const symbols = [
            "✦",
            "✧",
            "•",
            "◆",
            "★"
        ];


        for (
            let i = 0;
            i < 80;
            i++
        ) {

            const piece =
                document.createElement("div");


            piece.className =
                "confetti-piece";


            piece.innerHTML =
                symbols[
                    Math.floor(
                        Math.random() *
                        symbols.length
                    )
                ];


            piece.style.position =
                "fixed";


            piece.style.left =
                Math.random() * 100 +
                "vw";


            piece.style.top =
                "-20px";


            piece.style.zIndex =
                "100000";


            piece.style.fontSize =
                8 +
                Math.random() * 15 +
                "px";


            const rotation =
                Math.random() * 720 -
                360;


            const xMovement =
                Math.random() * 200 -
                100;


            piece.animate(

                [

                    {
                        transform:
                            "translate(0,0) rotate(0deg)",

                        opacity: 1
                    },

                    {
                        transform:
                            `translate(
                                ${xMovement}px,
                                110vh
                            )
                            rotate(
                                ${rotation}deg
                            )`,

                        opacity: 0
                    }

                ],

                {

                    duration:
                        1800 +
                        Math.random() * 1800,

                    delay:
                        Math.random() * 500,

                    easing:
                        "cubic-bezier(.2,.7,.3,1)"

                }

            );


            document.body.appendChild(
                piece
            );


            setTimeout(() => {

                piece.remove();

            }, 4500);

        }

    }



/* =====================================================
   ENTER CAFÉ → HOME PAGE
===================================================== */

enterCafe.addEventListener("click", () => {
    closeOpening();
});


skipOpening.addEventListener("click", () => {
    closeOpening();
});


function closeOpening() {

    overlay.classList.add("opening-close");

    setTimeout(() => {

        overlay.style.display = "none";

        // Stay on HOME page and scroll to top
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 1000);

}
});