import * as THREE from "three";
import WebGL from '../../node_modules/three/examples/jsm/capabilities/WebGL.js';
import { OrbitControls } from "../../node_modules/three/examples/jsm/controls/OrbitControls.js";
import printTree from '../mesh/tree.js'
import printHanra from '../mesh/hanra.js'

const $result = document.getElementById('result');

// WebGL 호환될때만 호출
if (WebGL.isWebGLAvailable()) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xFFE187)
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0);
  const renderer = new THREE.WebGLRenderer({
    canvas: $result, antialias: true
  })

  renderer.setSize(window.innerWidth, window.innerHeight);
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(0, 2, 4);
  scene.add(pointLight);

  /** =================== 한라봉, 야자수 만들기 ===================*/

  // 한라봉 코드 분리
  const hanra1 = printHanra();
  scene.add(hanra1);
  hanra1.position.x = 0;
  hanra1.scale.set(0.5, 0.5, 0.5);
  
  // 야자수 코드 분리
  const tree1 = printTree();
  scene.add(tree1);
  tree1.position.x = 2;
  
  // 축
  const axes = new THREE.AxesHelper(10);
  scene.add(axes);

  // Scene와 Camera를 연결
  renderer.render(scene, camera);

  /** =================== 애니메이션 =================== */
  
  // OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true;
  controls.enableRotate = true;
  controls.enablePan = true;
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
