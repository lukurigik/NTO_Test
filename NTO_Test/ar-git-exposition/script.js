const way = ["12", "8765", "43"];
const map = document.querySelector(".map");
const start = document.querySelector(".start");
const remain = document.querySelector(".remain");
const next = document.querySelector(".next");
const end = document.querySelector(".end");
const arrowFirst = document.querySelector(".map__arrow1");
const arrowSecond = document.querySelector(".map__arrow2");
const arrowThird = document.querySelector(".map__arrow3");
let wayCol = 0;
let col = 0;

start.addEventListener("click", (e) => {
    start.classList.add("none");
    arrowFirst.classList.add("none");
    arrowSecond.classList.add("none");
    arrowThird.classList.add("none");
    if (way[wayCol].includes("1")) {
        arrowFirst.classList.remove("none");
    } else if (way[wayCol].includes("3")) {
        arrowSecond.classList.remove("none");
    } else if (way[wayCol].includes("5")) {
        arrowThird.classList.remove("none");
    }
    remain.classList.remove("none");
});

const nextExp = () => {
    
    map.classList.add("none");
    try {
        let scene = document.querySelector(".scene")
        let video = document.querySelector("#arjs-video")
        let show = document.querySelector(".show")
        scene.remove()
        video.remove()
        show.remove()
        way[wayCol][col]
        next.classList.remove("none")
        console.log(scene, 'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
        document.body.insertAdjacentHTML(
            "beforeend",
            `<a-scene embedded arjs class="none scene">

            </a-scene>
            <div class="show">${wayCol + " " + col}</div>
            `
        );
        if (way[wayCol][col + 1]) {
            ++col
        } else {
            col = 0
            ++wayCol
        }
        next.addEventListener('click', next)
    } catch(err) {
        console.log("safaSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
        end.classList.remove("none")
        next.classList.remove("none")
        next.classList.add("none")
        remain.classList.add("none")
        start.classList.add("none")
    }
    console.log(wayCol, col, '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
}
remain.addEventListener("click", nextExp);
next.addEventListener("click", nextExp);
