import { Component, css } from "../../../../Component.js";
import { element } from "../../../../Helpers.js";

export default class Camera extends Component {
  constructor() {
    super();

    css(import.meta, [
      "../styles/camera.css"
    ]);

    this.scripts = () => {
      let videoStream = null;
      const cameraToggle = element("#camera-toggle");
      const cameraContainer = element("#camera-container");
      const video = element("#video");
      const canvas = element("#canvas");
      const capture = element("#capture-button");
      const reset = element("#reset-camera");
      const imageInput = element("#image-data");
      const closeButton = element("#camera-close");
      const cameraCheck = element("#camera-check");

      // Ensure camera container starts hidden
      cameraContainer.style.display = "none";

      function closeCamera() {
        cameraContainer.style.display = "none";

        if (videoStream) {
          videoStream.getTracks().forEach(track => track.stop());
          videoStream = null;
        }
      }

      function openCamera() {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            cameraContainer.style.display = "flex";

            videoStream = stream;
            video.srcObject = stream;
            video.play();
          })
          .catch(error => {
            alert("Error accessing camera");
            console.error(error);
          });
      }

      cameraToggle.onclick = () => {
        if (cameraContainer.style.display === "none" || cameraContainer.style.display === "") {
          openCamera();
        } else {
          closeCamera();
        }
      };

      capture.onclick = () => {
        // Set canvas dimensions to match the video dimensions
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw video frame to canvas
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Save canvas data as base64
        const imageData = canvas.toDataURL("image/png");
        imageInput.value = imageData;

        // Show the captured image and hide the video
        canvas.style.display = "block";
        video.style.display = "none";
        cameraCheck.style.display = "block";
      };

      reset.onclick = () => {
        // Clear the canvas and hidden input, show the video
        canvas.style.display = "none";
        video.style.display = "block";
        imageInput.value = '';
        cameraCheck.style.display = "none"
      };

      closeButton.onclick = () => closeCamera();
    };

    this.template = /*html*/`
      <div class="row gap center">
        <button type="button" id="camera-toggle">Show Camera</button>
        <p id="camera-check">✅</p>
      </div>

      <div id="camera-container" class="column gap-default">
        <video id="video" autoplay></video>
        <canvas id="canvas" style="display: none;"></canvas>

        <div class="row spaced">
          <div class="row gap">
            <button type="button" id="capture-button">Capture</button>
            <button type="button" id="reset-camera">Reset</button>
          </div>
          <button type="button" id="camera-close">Close</button>
        </div>

        <input type="text" name="profile_image" id="image-data" hidden>
      </div>
    `;
  }
}
