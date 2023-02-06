function shuffle(array) {
	let arr = array;
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	for (let i = array.length - 1; i > 0; i--) {
		if (Math.random() >= 0.5) {
			arr[i].reverse();
		}
	}
	return arr;
}

const generateMap = document.querySelector(".generate-map");

generateMap.addEventListener("click", () => {
	console.log(
		shuffle([
			[1, 2],
			[3, 4],
			[5, 6, 7, 8],
		]),
	);
});

const createShow = document.querySelector(".create__show");
const createInput = document.querySelector(".create__input");
const createAccess = document.querySelector(".create__access");
const createWrong = document.querySelector(".create__wrong");
const createSelect = document.querySelector(".create__select");
const createDel = document.querySelector(".create__del");

const wrong = () => {
	createWrong.classList.remove("none");
	setTimeout(() => {
		createWrong.classList.add("none");
	}, 2000);
};

createShow.addEventListener("click", (e) => {
	createSelect.classList.toggle("none");
	createAccess.classList.toggle("none");
	createShow.textContent === "Back"
		? (createShow.textContent = "Create own way")
		: (createShow.textContent = "Back");
});

let endWay = [];
colStr = 0;

createInput.addEventListener("keydown", (e) => {
	if (e.key === "Backspace" && createInput.value.length !== 0) {
		colStr -= 1;
	} else {
		colStr += 1;
	}
	if (colStr === 0) {
		createDel.classList.add("none");
	} else {
		createDel.classList.remove("none");
	}
});

createDel.addEventListener("click", (e) => {
	createInput.value = "";
	colStr = 0;
	createDel.classList.add("none");
});

createAccess.addEventListener("click", (e) => {
	const way = createInput.value.split("-");
	for (i of way) {
		if (!+i) {
			wrong();
			endWay = [];
		} else {
			if (
				i === "12" ||
				i === "21" ||
				i === "34" ||
				i === "43" ||
				i === "5678" ||
				(i === "8765" && !endWay.includes(i))
			) {
				endWay.push(i);
			} else {
				wrong();
				endWay = [];
			}
		}
	}
	if (endWay.length !== 3) {
		wrong();
		endWay = [];
	}
});
