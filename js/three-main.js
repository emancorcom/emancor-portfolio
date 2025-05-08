var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 20);

var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

const threeWrapper = document.querySelector('.three-wrapper');
threeWrapper.appendChild(renderer.domElement);

// Add lighting
var light = new THREE.AmbientLight(0xffffff, 1); // Soft white light
scene.add(light);

var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Instantiate a loader
var loader = new THREE.GLTFLoader();
loader.load('models/emancor.glb', handle_load); // Update the path to your model

var mesh;
var targetPosition = new THREE.Vector3(-10, 0, 0); // Initial target position
var currentPosition = new THREE.Vector3(-10, 0, 0); // Track the current position for smooth animation
var targetScale = 1; // Target scale
var currentScale = 1; // Current scale

// Define a maximum scale limit
const maxScale = 1.25; // Set maximum scale size to 1.25

function handle_load(gltf) {
    mesh = gltf.scene;

    mesh.traverse((node) => {
        if (node.isMesh) {
            node.material = new THREE.MeshBasicMaterial({
                color: 0x42aeab,
                roughness: 1,
                metalness: 0
            });
        }
    });

    scene.add(mesh);

    // Set initial position and scale
    mesh.position.set(-10, 0, 0);
    mesh.scale.set(1, 1, 1);

    // Adjust model for current screen size
    adjustModelPositionAndScale();
}

var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -10);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var pointOfIntersection = new THREE.Vector3();
window.addEventListener("mousemove", onMouseMove, false);

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, pointOfIntersection);
    if (mesh) {
        const targetQuaternion = new THREE.Quaternion();
        const lookAtPosition = new THREE.Vector3().copy(pointOfIntersection);
        mesh.lookAt(lookAtPosition);
        targetQuaternion.copy(mesh.quaternion);
        mesh.quaternion.slerp(targetQuaternion, 0.1);
    }
}

// Adjust both position and scale based on window width
function adjustModelPositionAndScale() {
    const screenWidth = window.innerWidth;

    const initialOffset = -6.5; // Start position at 1001px
    const stepSize = -0.5;      // Move further left with increasing width
    const scaleStep = 0.1;
    const maxSteps = 10;

    if (screenWidth <= 1000) {
        targetPosition.set(0, 2.25, 0); // Move up by 3 units when <= 1000px
        targetScale = 1;
        return;
    }

    const extraWidth = screenWidth - 1001;
    const steps = Math.min(Math.floor(extraWidth / 100), maxSteps);

    const targetX = initialOffset + steps * stepSize;
    targetScale = 1 + steps * scaleStep;
    targetScale = Math.min(targetScale, maxScale);

    targetPosition.set(targetX, 0, 0); // Default vertical position
}

// Resize handler
window.addEventListener("resize", () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    adjustModelPositionAndScale();
});

// Animation loop
renderer.setAnimationLoop(() => {
    if (mesh) {
        currentPosition.lerp(targetPosition, 0.05);
        mesh.position.copy(currentPosition);

        currentScale += (targetScale - currentScale) * 0.05;
        mesh.scale.set(currentScale, currentScale, currentScale);
    }
    renderer.render(scene, camera);
});

// Initial adjustment
adjustModelPositionAndScale();
