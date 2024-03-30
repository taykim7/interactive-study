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

  // 그림자 추가를 위한 설정1
  renderer.shadowMap.enabled = true;

  /** light ===================*/
  // DirectionalLight - 그림자가 생김
  const directionaLight = new THREE.DirectionalLight(0xffffff, 1);
  directionaLight.position.set(0, 2, 2);
  scene.add(directionaLight);
  // DirectionalLight 시각화
  const dlHelper = new THREE.DirectionalLightHelper(directionaLight, 1, 0xffffff);
  scene.add(dlHelper);

  // 그림자 추가를 위한 설정2 - 이 빛으로 그림자를 만들도록 설정
  directionaLight.castShadow = true;

  // 그림자 설정
  // (1) 선명도
  directionaLight.shadow.mapSize.width = 1024;
  directionaLight.shadow.mapSize.height = 1024;
  // (2) 흐림효과
  directionaLight.shadow.radius = 15;


  /** Mesh ===================*/
  const geometry = new THREE.SphereGeometry(1);
  const material = new THREE.MeshStandardMaterial({ color: 0x2E6FF2 })
  const cube = new THREE.Mesh(geometry, material);

  // 그림자 추가를 위한 설정3 - 설정한 빛에 의해 그림자를 만들도록 설정
  cube.castShadow = true;
  scene.add(cube);

  const geometry2 = new THREE.PlaneGeometry(10, 10);
  const material2 = new THREE.MeshStandardMaterial({
    color: 0x2E6FF2,
    side: THREE.DoubleSide,
  })
  const plane = new THREE.Mesh(geometry2, material2);
  plane.rotation.x = Math.PI / -2;
  plane.position.y = -1;

  // 그림자 추가를 위한 설정4 - 그림자를 받도록 설정
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
