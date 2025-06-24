// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000); // Black background
document.getElementById('model-container').appendChild(renderer.domElement);

// Add lights for better visualization
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
directionalLight2.position.set(-1, 0.5, -1);
scene.add(directionalLight2);

// Set up camera position
camera.position.z = 5;

// Add OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Material for Egyptian artifacts (sandy limestone look)
const naturalMaterial = new THREE.MeshPhongMaterial({
    color: 0xD2B48C, // Tan/sand color
    specular: 0x222222,
    shininess: 15,
    flatShading: false
});

// Alternative material options to try
window.materials = [
    naturalMaterial, // Default sandy material
    new THREE.MeshPhongMaterial({
        color: 0xBEBEAE, // Lighter stone color
        specular: 0x333333,
        shininess: 10,
        flatShading: false
    }),
    new THREE.MeshPhongMaterial({
        color: 0x8B7355, // Darker brown, like aged wood or stone
        specular: 0x222222,
        shininess: 5,
        flatShading: false
    }),
    new THREE.MeshStandardMaterial({
        color: 0xD2B48C,
        roughness: 0.8,
        metalness: 0.1
    })
];

// Current material index
window.currentMaterialIndex = 0;

// Model to load - using the Hatshepsut model by default
const modelPath = 'models/Hatshepsut_Knealing.obj';
let currentModel = null;

// Function to load model
window.loadModel = function(modelPath, material) {
    if (window.updateLoadingStatus) {
        window.updateLoadingStatus(0);
    }
    
    const objLoader = new THREE.OBJLoader();
    
    objLoader.load(
        modelPath,
        (object) => {
            // Apply material to all meshes in the model
            object.traverse(function(child) {
                if (child instanceof THREE.Mesh) {
                    child.material = material;
                }
            });
            
            // Keep reference to current model
            if (currentModel) {
                scene.remove(currentModel);
            }
            currentModel = object;
            scene.add(currentModel);
            
            // Center and adjust model
            centerAndAdjustModel(currentModel);
            
            console.log('Model loaded successfully');
            
            if (window.updateLoadingStatus) {
                window.updateLoadingStatus(100);
            }
        },
        (xhr) => {
            const percent = xhr.loaded / xhr.total * 100;
            console.log(percent + '% loaded');
            
            if (window.updateLoadingStatus) {
                window.updateLoadingStatus(percent);
            }
        },
        (error) => {
            console.error('Error loading OBJ:', error);
            if (window.updateLoadingStatus) {
                window.updateLoadingStatus(100); // Hide loading indicator on error
            }
        }
    );
}

// Function to center and adjust model
function centerAndAdjustModel(object) {
    // Center the model
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    object.position.sub(center);
    
    // Adjust camera to fit model
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    camera.position.z = maxDim * 2;
}

// Load the model with default material
window.loadModel(modelPath, window.materials[window.currentMaterialIndex]);

// Add keyboard controls to change materials
window.addEventListener('keydown', function(event) {
    // Press 'M' key to cycle through materials
    if (event.key === 'm' || event.key === 'M') {
        window.currentMaterialIndex = (window.currentMaterialIndex + 1) % window.materials.length;
        console.log(`Switched to material ${window.currentMaterialIndex + 1}/${window.materials.length}`);
        
        if (currentModel) {
            currentModel.traverse(function(child) {
                if (child instanceof THREE.Mesh) {
                    child.material = window.materials[window.currentMaterialIndex];
                }
            });
        }
    }
    
    // Number keys 1-3 to load different models
    if (event.key === '1') {
        window.loadModel('models/Hatshepsut_Knealing.obj', window.materials[window.currentMaterialIndex]);
    } else if (event.key === '2') {
        window.loadModel('models/4repair.obj', window.materials[window.currentMaterialIndex]);
    } else if (event.key === '3') {
        window.loadModel('models/objPyra.obj', window.materials[window.currentMaterialIndex]);
    }
});

// Handle window resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();