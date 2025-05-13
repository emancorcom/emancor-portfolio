var scene = new THREE.Scene();

// Add light blue fog to the scene
scene.fog = new THREE.Fog(0xdbe121, 18, 27); // Light blue fog, near = 10, far = 50

var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 20);

var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for high-DPI screens
renderer.shadowMap.enabled = true; // Enable shadow maps if needed
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Use a performant shadow map type
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

// Instantiate a loader for the first model
var loader = new THREE.GLTFLoader();
loader.load('models/emancor.glb', handle_load); // Update the path to your model

var mesh;
var targetPosition = new THREE.Vector3(0, .75, 0); // Initial target position
var currentPosition = new THREE.Vector3(0, 0, 0); // Track the current position for smooth animation
var targetScale = 1; // Target scale
var currentScale = 1; // Current scale

// Define a maximum scale limit
const maxScale = 1.25; // Set maximum scale size to 1.25

function handle_load(gltf) {
    mesh = gltf.scene;

    mesh.traverse((node) => {
        if (node.isMesh) {
            node.material = new THREE.MeshBasicMaterial({
                color: 0xFFFFFF,
                flatShading: true
            });
        }
    });

    scene.add(mesh);

    // Set initial position and scale
    mesh.position.set(0, 0, 0);
    mesh.scale.set(1.2, 1.2, 1.2);
}

// Load another 3D model
var loader2 = new THREE.GLTFLoader();
var staticMesh;

loader2.load('models/scene.glb', (gltf) => {
    staticMesh = gltf.scene;

    staticMesh.traverse((node) => {
        if (node.isMesh) {
            node.material = new THREE.MeshBasicMaterial({
                color: 0x59bf00,
                flatShading: true
            });
        }
    });

    // Set position and scale
    staticMesh.position.set(0, .75, 0); // Centered
    staticMesh.scale.set(.4, .4, .4); // Same scale as the other model

    scene.add(staticMesh);
});

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
        const lookAtPosition = new THREE.Vector3().copy(pointOfIntersection);
        mesh.lookAt(lookAtPosition); // Directly set the rotation for instant response
    }
}

// Adjust both position and scale based on window width


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