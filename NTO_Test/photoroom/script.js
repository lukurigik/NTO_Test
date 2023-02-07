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
            back.classList = "back";
            document.body.appendChild(back);

            const imageDownload = document.createElement("a");
            imageDownload.href = canvas.toDataURL();
            imageDownload.download = "screenshot.jpg";
            imageDownload.text = "Download";
            imageDownload.classList = "download";
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
const switcher = document.querySelector("#switcher");
const switchBear = document.querySelector("#bear");
const switch2d = document.querySelector("#mask");
let scene = document.querySelector("#scene");

switchBear.addEventListener("click", (e) => {
    console.log('dgdg');
    scene.outerHTML = `<a-scene id="scene"><a-entity zappar-permissions-ui id="permissions"></a-entity><a-entity zappar-compatibility-ui id="compatibility"></a-entity><a-camera zappar-camera="user-facing: true;" /><a-entity zappar-face id="my-face-tracker"><a-entity zappar-head-mask="face:#my-face-tracker;"></a-entity><a-entity light="type: point; intensity: 2; distance: 1000; decay: 1" position="0 10 10"></a-entity><a-entity id="switcher" gltf-model="./ref/animation.glb" position="-2 -3 4" scale="0.3 0.3 0.3" rotation="0 -90 0" animation-mixer="clip: ArmatureAction.001; loop: repeat;timeScale: 1" xrextras-hold-drag xrextras-two-finger-rotate xrextras-pinch-scale></a-entity></a-entity></a-scene>`;
    scene = document.querySelector("#scene");
});

switch2d.addEventListener("click", (e) => {
    scene.outerHTML = `<a-scene id="scene"><a-entity zappar-permissions-ui id="permissions"></a-entity><a-entity zappar-compatibility-ui id="compatibility"></a-entity><a-camera zappar-camera="user-facing: true;" /><a-entity zappar-face id="face-anchor"><a-entity geometry="primitive: face-mesh; face: #face-anchor" material="src:./ref/mask-smth.jpg; transparent: true;"></a-entity></a-entity></a-scene>`;
    scene = document.querySelector("#scene");
});


