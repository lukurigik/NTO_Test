const screenshotBtn = document.querySelector(".make-screenshot");
const screenshotPreview = document.querySelector(".preview");
const captureScreen = async () => {
	screenshotBtn.classList.add("none");
	try {
		// asking permission to use a media input to record current tab
		const stream = await navigator.mediaDevices.getDisplayMedia({
			preferCurrentTab: true,
		});
		const video = document.createElement("video");

		video.addEventListener("loadedmetadata", () => {
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");
			// passing video width & height as canvas width & height
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;

			video.play(); // playing the video so the drawn image won't be black or blank
			// drawing an image of the captured video stream
			ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
			stream.getVideoTracks()[0].stop(); // terminating first video track of the stream

			// passing canvas data url as screenshot preview src
			screenshotPreview.querySelector("img").src = canvas.toDataURL();
			screenshotPreview.classList.add("show");

			const back = document.createElement("img");
			back.src = "./ref/cross.png";
			back.classList = "back"
			document.body.appendChild(back);

			const imageDownload = document.createElement("a");
			imageDownload.href = canvas.toDataURL();
			imageDownload.download = "screenshot.jpg";
			imageDownload.text = "Download";
			imageDownload.classList = "download"
			document.body.appendChild(imageDownload);

			back.addEventListener("click", () => {
				screenshotPreview.classList.remove("show");
				screenshotBtn.classList.remove("none");
				back.remove();
				imageDownload.remove();
			});

			imageDownload.addEventListener("click", () => {
				screenshotPreview.classList.remove("show");
				screenshotBtn.classList.remove("none");
				back.remove();
				imageDownload.remove();
			});
		});
		video.srcObject = stream; // passing capture stream data as video source object
	} catch (error) {
		screenshotBtn.classList.remove("none");
	}
};
screenshotBtn.addEventListener("click", captureScreen);
