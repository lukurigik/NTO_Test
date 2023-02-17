const way = ["21", "8765", "43"];
const map = document.querySelector(".map");
const start = document.querySelector(".start");
const remain = document.querySelector(".remain");
const next = document.querySelector(".next");
const end = document.querySelector(".end");
const arrowFirst = document.querySelector(".map__arrow1");
const arrowSecond = document.querySelector(".map__arrow2");
const arrowThird = document.querySelector(".map__arrow3");
const nextRoom = document.querySelector(".next-room");
const white = document.querySelector(".white");
let wayCol = 0;
let col = 0;
let inRoom = false;

// 1 - маркер
// 2 - моделька
// 3 - стрелка если вперёд
// 4 - стрелка если назад

const findRightArrow = () => {
    map.classList.remove("none");
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
};

let json = {};
let isAvailable = false;
const timerId = setTimeout(() => {
    if (isAvailable) {
        clearTimeout(timerId);
    } else {
        const el = document.getElementById("test").innerHTML.trim();
        if (el.length > 0) {
            isAvailable = true;
            json = JSON.parse(el);
        }
    }
}, 1000);

const addScene = () => {
    console.log(way[wayCol][col], "21451211111111111111111111111111111111");
    let scene = document.querySelector(".scene");
    let video = document.querySelector("#arjs-video");
    let show = document.querySelector(".show");
    scene.remove();
    video.remove();
    show.remove();

    document.body.insertAdjacentHTML(
        "beforeend",
        `
        <a-scene embedded arjs class="scene">
            <a-marker
                type="pattern"
                preset="custom"
                url="${json[way[wayCol][col]][0]}"
            >
                <a-entity
                    position="0 0 0"
                    scale="5 5 5"
                    gltf-model="${json[way[wayCol][col]][1]}"
                ></a-entity>
            </a-marker>
            <a-entity camera></a-entity>
        </a-scene>
        
        <div class="show">${wayCol + " " + col}</div>
        `
    );
};

start.addEventListener("click", (e) => {
    console.log(way[wayCol][col], "21451211111111111111111111111111111111");
    start.classList.add("none");
    findRightArrow();
    remain.classList.remove("none");
});

const nextExp = () => {
    console.log(way[wayCol][col], "21451211111111111111111111111111111111");
    remain.classList.add("none");
    map.classList.add("none");

    try {
        addScene();
    } catch (err) {
        console.log(err);
        end.classList.remove("none");
        next.classList.add("none");
        remain.classList.add("none");
        start.classList.add("none");
    }
    if (col === 0) {
        inRoom = true;
    }
    if (inRoom) {
        if (way[wayCol][col + 1]) {
            ++col;
        } else {
            col = 0;
            ++wayCol;
        }
        nextRoom.classList.remove("none");
        //! Здесь событие во время прехода
        map.classList.remove("none");
        white.classList.remove("none");
        next.classList.add("none");
        next.innerHTML = "Следующий экспонат";
        findRightArrow();
        nextRoom.addEventListener("click", (e) => {
            nextRoom.classList.add("none");
            next.classList.remove("none");
            let arrow;
            console.log(
                way[wayCol][col],
                way[wayCol][col + 1],
                "---------------------------------------------"
            );
            if (way[wayCol][col] > way[wayCol][col + 1]) {
                arrow = `<img class="arrow-back" alt="<" src=${
                    json[way[wayCol][col]][3]
                }></img>`;
            } else {
                arrow = `<img class="arrow-next" alt=">" src=${
                    json[way[wayCol][col]][2]
                }></img>`;
            }
            next.insertAdjacentHTML("beforeend", arrow);
            inRoom = false;
            white.classList.add("none");
            map.classList.add("none");
            //! Здесь событие после перехода в другю комнату
        });
    } else if (!inRoom) {
        next.classList.remove("none");
        if (way[wayCol][col + 1]) {
            ++col;
        } else {
            col = 0;
            ++wayCol;
        }
    }
};
remain.addEventListener("click", nextExp);
next.addEventListener("click", nextExp);
