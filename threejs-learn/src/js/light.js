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

  /** light ===================*/
  // 1. AmbientLight
  // 전역으로 빛을 발산
  // 그림자명암X
  // 출력과 재질 확인용
  // const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  // scene.add(ambientLight);

  // 2. DirectionalLight
  // 방향성 광원, 거리와 상관없이 동일한 빛의 효과 적용.
  // 그림자가 생김
  // 빛의 기본 위치는 0, 1, 0
  // 타겟의 기본 방향은 0, 0, 0
  // const directionaLight = new THREE.DirectionalLight(0xffffff, 1);
  // directionaLight.position.set(-2, 2, 0);
  // scene.add(directionaLight);
  // DirectionalLight 시각화
  // const dlHelper = new THREE.DirectionalLightHelper(directionaLight, 1, 0xffffff);
  // scene.add(dlHelper);

  // 3. PointLight
  // 한 점에서 방출되는 빛 마치 전구
  // const pointLight = new THREE.PointLight(0xff0000);
  // pointLight.position.set(1, 1, 0);
  // scene.add(pointLight);
  // // PointLight 시각화
  // const plHelper = new THREE.PointLightHelper(pointLight, 1, 0x00ff00);
  // scene.add(plHelper);

  // 4. SpotLight
  // 원 뿔형으로 방출되는 빛 마치 무대의 스포트라이트
  // (색상, 강도, 거리, 각도, 페넘브라-흐림효과)
  // const spotLight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 6, 0.5);
  // spotLight.position.y = 2;
  // scene.add(spotLight);
  // // SpotLight 시각화
  // const spHelper = new THREE.SpotLightHelper(spotLight, 0x00ff00);
  // scene.add(spHelper);

  // 5. HemisphereLight
  // 위 아래로 빛이 방출
  // 하늘면, 바닥면 색상 지정 가능
  // AmbientLight처럼 그림자명암X
  const hemisphereLight = new THREE.HemisphereLight(0xffaaa, 0x00ff00)
  scene.add(hemisphereLight);
  
  /** Mesh ===================*/
  const geometry = new THREE.SphereGeometry(1);
  const material = new THREE.MeshStandardMaterial({ color: 0x2E6FF2 })
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const geometry2 = new THREE.PlaneGeometry(10, 10);
  const material2 = new THREE.MeshStandardMaterial({
    color: 0x2E6FF2,
    side: THREE.DoubleSide,
  })
  const plane = new THREE.Mesh(geometry2, material2);
  plane.rotation.x = Math.PI / -2;
  plane.position.y = -1;
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
