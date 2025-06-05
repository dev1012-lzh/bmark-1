
document.addEventListener('keydown', function (event) {

    // Clear the interval when Escape is pressed
    clearInterval(boxCreationInterval);
    // Optionally, you can also stop the engine
    engine.stopRenderLoop();
    // Optionally, you can also dispose of the scene
    scene.dispose();
    // Optionally, you can also reset the box count
    numBoxes = 0;
    document.getElementById("boxCount").innerText = numBoxes;
    alert("Process stopped. Press OK to go back.");
    window.location.replace('aborted.html')
});

let numBoxes = 500; // Initial number of boxes
let boxCreationInterval;

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
const detectRefreshRate = () => {
    return new Promise(resolve => {
        let requestId;
        let frames = 0;
        let startTime;
        function count(timestamp) {
            if (!startTime) startTime = timestamp;
            frames++;
            if (timestamp - startTime < 1000) {
                requestId = requestAnimationFrame(count);
            } else {
                cancelAnimationFrame(requestId);
                resolve(frames);
            }
        }
        requestId = requestAnimationFrame(count);
    });
};
// Use it before engine initialization
detectRefreshRate().then(refreshRate => {
    console.log(`Display refresh rate: ${refreshRate}Hz`);
    localStorage.setItem('displayRefreshRate', refreshRate);
});
const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);
    // Random camera animation
    const animateCameraPosition = () => {
        const randomPoint = new BABYLON.Vector3(
            Math.random() * 20 - 10,
            Math.random() * 20 - 10,
            Math.random() * 20 - 10
        );
        const animationDuration = 2000 + Math.random() * 3000;
        var hz = localStorage.getItem('displayRefreshRate') || 60;
        BABYLON.Animation.CreateAndStartAnimation(
            "cameraAnimation",
            camera,
            "position",
            parseFloat(localStorage.getItem('displayRefreshRate')) || 60,
            parseFloat(localStorage.getItem('displayRefreshRate')) || 60,
            camera.position,
            randomPoint,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
            new BABYLON.CircleEase()
        );

        setTimeout(animateCameraPosition, animationDuration);
    };

    setTimeout(animateCameraPosition, 1000);
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    const autoRotate = new BABYLON.AutoRotationBehavior();
    autoRotate.idleRotationSpeed = 0.5;
    camera.addBehavior(autoRotate);
    camera.radius = 15;

    camera.detachControl(canvas);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // Function to create boxes
    const createBoxes = () => {
        let boxesToCreate
        for (let i = 0; i < 5; i++) {
            const box = BABYLON.MeshBuilder.CreateBox("box" + (numBoxes + i), { size: 0.2 }, scene);
            box.position.x = Math.random() * 10 - 5;
            box.position.y = Math.random() * 10 - 5;
            box.position.z = Math.random() * 10 - 5;
            box.rotation.x = Math.random() * Math.PI;
            box.rotation.y = Math.random() * Math.PI;
            box.rotation.z = Math.random() * Math.PI;
            const material = new BABYLON.StandardMaterial("boxMaterial" + (numBoxes + i), scene);
            material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
            box.material = material;
        }
        numBoxes += 5;
    };

    // Initial box creation
    for (let i = 0; i < numBoxes; i++) {
        const box = BABYLON.MeshBuilder.CreateBox("box" + i, { size: 0.2 }, scene);
        box.position.x = Math.random() * 10 - 5;
        box.position.y = Math.random() * 10 - 5;
        box.position.z = Math.random() * 10 - 5;
        box.rotation.x = Math.random() * Math.PI;
        box.rotation.y = Math.random() * Math.PI;
        box.rotation.z = Math.random() * Math.PI;
        const material = new BABYLON.StandardMaterial("boxMaterial" + (numBoxes + i), scene);
        material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        box.material = material;
    }

    // Set interval to create boxes every second
    boxCreationInterval = setInterval(createBoxes, 10);

    return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
    const fps = engine.getFps();
    document.getElementById("fpsValue").innerText = Math.ceil(fps);
    document.getElementById("boxCount").innerText = numBoxes;
});

window.addEventListener("resize", function () {
    engine.resize();
});
