import * as THREE from "three";
import WebGL from '../../node_modules/three/examples/jsm/capabilities/WebGL.js';
import { OrbitControls } from "../../node_modules/three/examples/jsm/controls/OrbitControls.js";

// html canvase
const $result = document.getElementById('result');

// WebGL 호환
if (WebGL.isWebGLAvailable()) {
  /** scene ===================*/
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xFFE187)
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(3, 3, 3);
  camera.lookAt(0, 0, 0);

  /** renderer ===================*/
  const renderer = new THREE.WebGLRenderer({
    canvas: $result, antialias: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  /** light ===================*/
  // AmbientLight
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);
  // DirectionalLight
  const directionaLight = new THREE.DirectionalLight(0xffffff, 1);
  directionaLight.position.set(0, 2, 2);
  scene.add(directionaLight);
  const dlHelper = new THREE.DirectionalLightHelper(directionaLight, 1, 0xffffff);
  scene.add(dlHelper);
  directionaLight.castShadow = true;
  directionaLight.shadow.mapSize.width = 1024;
  directionaLight.shadow.mapSize.height = 1024;
  directionaLight.shadow.radius = 15;

  /** texture ===================*/
  const loader = new THREE.TextureLoader();
  const basecolor = loader.load('./src/textures/bark/Bark_06_basecolor.jpg');
  const normal = loader.load('./src/textures/bark/Bark_06_normal.jpg');
  const rough = loader.load('./src/textures/bark/Bark_06_roughness.jpg');
  const height = loader.load('./src/textures/bark/Bark_06_height.png');

  /** Mesh (+texture) ===================*/
  const geometry = new THREE.SphereGeometry(1);
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

  const material = new THREE.MeshStandardMaterial({
    // 1. map: 재질의 색상 (기본 흰색이 합쳐져서 좀 밝아짐)
    map: basecolor,
    // 2. normalMap: 표면에 빛을 왜곡해서 입체감. 실제 형태는 안변함. normalScale로 왜곡정도를 조정. 
    normalMap: normal,
    // normalScale: new THREE.Vector2(0, 0),
    roughness: 0.4,
    // 3. roughnessMap : 명암에 따라 매끈, 거칠기 등 질감을 표현 
    roughnessMap: rough,
    // 4. displacementMap: 명암에 따라 표면의 높낮이를 조절. 형태 자체를 변함
    displacementMap: height,
    displacementScale: 0.5,
  });

  // 5. 여러개의 재질 적용
  const boxBaterials = [
    new THREE.MeshStandardMaterial({color: 0xff0000}),
    new THREE.MeshStandardMaterial({color: 0xff8c00}),
    new THREE.MeshStandardMaterial({color: 0xffee00}),
    new THREE.MeshStandardMaterial({color: 0x4de94c}),
    new THREE.MeshStandardMaterial({color: 0x3783ff}),
    new THREE.MeshStandardMaterial({color: 0x4815aa}),
  ]

  const cube = new THREE.Mesh(geometry, material);
  const box = new THREE.Mesh(boxGeometry, boxBaterials);

  cube.castShadow = true;
  box.castShadow = true;
  box.position.set(1, 1, 1);
  scene.add(cube);
  scene.add(box);

  const geometry2 = new THREE.PlaneGeometry(10, 10);
  const material2 = new THREE.MeshStandardMaterial({
    color: 0x2E6FF2,
    side: THREE.DoubleSide,
  })
  const plane = new THREE.Mesh(geometry2, material2);
  plane.rotation.x = Math.PI / -2;
  plane.position.y = -1;
  plane.receiveShadow = true;
  scene.add(plane);

  renderer.render(scene, camera);

  /** animate, event =================== */
  // OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true;
  controls.enableRotate = true;
  controls.enablePan = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 3;
  controls.enableDamping = true;
  function animate() {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);
  }
  animate();
  // resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
} else {
  document.body.appendChild(WebGL.getWebGLErrorMessage())
}
