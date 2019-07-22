'use strict';

/* global THREE */

let camera, renderer;

main();

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function main() {
    const canvas = document.querySelector('#c');
    renderer = new THREE.WebGLRenderer({ canvas, antialiasing: true });

    const cameraRoot = new THREE.Group();
    cameraRoot.name = "CameraRoot";
    console.log(cameraRoot.position);
    console.log(cameraRoot.rotation);
    console.log(cameraRoot.scale);
    
    const fov = 60;
    const aspect = window.innerWidth / window.innerHeight;  // the canvas default
    const near = 0.1;
    const far = 1000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    //console.log("Camera Parent Name: " + camera.parent.name);
    //cameraRoot.add(camera);
    camera.position.set(0, 1.2, 3);

    console.log(camera.position);
    console.log(camera.rotation);

    //cameraRoot.rotation.y = Math.PI;

    //const controls = new THREE.OrbitControls(camera, canvas);
    //controls.target.set(0, 5, 0);
    //controls.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('white');
    //camera.lookAt(scene.position);

    window.addEventListener('resize', onWindowResize, false);
    onWindowResize();

    {
        const planeSize = 40;

        const loader = new THREE.TextureLoader();
        const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        const repeats = planeSize / 2;
        texture.repeat.set(repeats, repeats);

        const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
        const planeMat = new THREE.MeshPhongMaterial({
            map: texture,
            side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.rotation.x = Math.PI * -.5;
        scene.add(mesh);
    }

    {
        const skyColor = 0xB1E1FF;  // light blue
        const groundColor = 0xB97A20;  // brownish orange
        const intensity = 1;
        const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        scene.add(light);
    }

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(0, 10, 2);
        light.target.position.set(-5, 0, 0);
        scene.add(light);
        scene.add(light.target);
    }

    {
        const objLoader = new THREE.OBJLoader();
        objLoader.load('/project-scuti/meshes/booth/booth.obj',
            //'https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.obj',
            function (object) {
                //object.position.y -= 60;
                object.rotation.y = Math.PI * -0.5;
            scene.add(object);
            }
            //(event) => {
            //const root = event.detail.loaderRootNode;
            //scene.add(root);
            //}

        );
    }

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render() {

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}























//'use strict';

//var container;
//var camera, scene, renderer;
//var mouseX = 0, mouseY = 0;
//var windowHalfX = window.innerWidth / 2;
//var windowHalfY = window.innerHeight / 2;
//const loader = new THREE.OBJLoader();

//init();
//animate();

//function init() {

//    container = document.createElement('div');
//    document.body.appendChild(container);

//    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 15000);
//    camera.position.z = 2500;

//    scene = new THREE.Scene();

//    renderer = new THREE.WebGLRenderer();
//    renderer.setClearColor(0xffffff);
//    renderer.setSize(window.innerWidth, window.innerHeight);
//    renderer.sortObjects = false;
//    container.appendChild(renderer.domElement);

//    Load();

//    window.addEventListener('resize', onWindowResize, false);

//}

//function onWindowResize() {

//    windowHalfX = window.innerWidth / 2;
//    windowHalfY = window.innerHeight / 2;

//    camera.aspect = window.innerWidth / window.innerHeight;
//    camera.updateProjectionMatrix();

//    renderer.setSize(window.innerWidth, window.innerHeight);

//}

//function onDocumentMouseMove(event) {

//    mouseX = (event.clientX - windowHalfX) * 10;
//    mouseY = (event.clientY - windowHalfY) * 10;

//}

//function animate() {

//    requestAnimationFrame(animate);
    
//    camera.position.x += (mouseX - camera.position.x) * .05;
//    camera.position.y += (- mouseY - camera.position.y) * .05;

//    camera.lookAt(scene.position);
//    renderer.render(scene, camera);

//}


//function Load() {
//    loader.setPath('/meshes/booth/');
//    loader.load(
//        'Booth.obj',
//        function (object) {
//            object.position.y -= 60;
//            scene.add(object);
//        },
//        function (error) {
//            console.error('An error happened');
//        }
//    );
//}