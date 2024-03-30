import * as THREE from "three";
import WebGL from '../../node_modules/three/examples/jsm/capabilities/WebGL.js';
import { OrbitControls } from "../../node_modules/three/examples/jsm/controls/OrbitControls.js";

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

  // 한라봉
  const hanra = new THREE.Group();

  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: '#ffa64c',
    // wireframe: true,
  });
  // 한라봉_밑
  const bottomGeoMetry = new THREE.DodecahedronGeometry(2, 1);
  const bottom = new THREE.Mesh(bottomGeoMetry, bodyMaterial);
  hanra.add(bottom);
  // 한라봉_위
  const topGeoMetry = new THREE.TetrahedronGeometry(0.8, 3);
  const top = new THREE.Mesh(topGeoMetry, bodyMaterial);
  hanra.add(top);
  top.position.y = 1.7;
  // 나뭇잎
  const leafMaterial = new THREE.MeshStandardMaterial({
    color: '#008000',
    side: THREE.DoubleSide,
  });
  // 나뭇잎_줄기
  const stemGeoMetry = new THREE.CylinderGeometry(0.1, 0.1, 0.4);
  const stem = new THREE.Mesh(stemGeoMetry, leafMaterial);
  hanra.add(stem);
  stem.position.y = 2.5;
  // 나뭇잎_잎
  const hanraLeafGeometry = new THREE.SphereGeometry(0.5, 32, 16, 0, Math.PI / 3);
  const hanraLeaf = new THREE.Mesh(hanraLeafGeometry, leafMaterial);
  hanra.add(hanraLeaf);
  hanraLeaf.position.set(-0.5, 2.4, -0.1);
  hanraLeaf.rotation.z = Math.PI / -2;
  
  scene.add(hanra);
  hanra.position.x = 0;
  hanra.scale.set(0.5, 0.5, 0.5);

  // -----------------------------------------------------

  // 야자나무
  const tree = new THREE.Group();
  const trunkMaterial = new THREE.MeshStandardMaterial({
    color: '#b67e36',
  });
  // 야자나무_줄기
  const trunk = new THREE.Group();
  const trunkGeometry = new THREE.CylinderGeometry(0.8, 1, 1.5);
  const trunk1 = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunk.add(trunk1);
  const trunk2 = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunk2.position.set(0.1, 1.3, 0);
  trunk2.scale.set(0.9, 0.9, 0.9);
  trunk2.rotation.z = THREE.MathUtils.degToRad(-5);
  trunk.add(trunk2);
  const trunk3 = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunk3.position.set(0.2, 2.5, 0);
  trunk3.scale.set(0.8, 0.8, 0.8);
  trunk3.rotation.z = THREE.MathUtils.degToRad(-5);
  trunk.add(trunk3);
  const trunk4 = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunk4.position.set(0.3, 3.5, 0);
  trunk4.scale.set(0.7, 0.7, 0.7);
  trunk4.rotation.z = THREE.MathUtils.degToRad(-8);
  trunk.add(trunk4);
  // 야자나무_줄기 그룹을 추가
  tree.add(trunk);

  // 야자나무_잎
  const leafGeometry = new THREE.SphereGeometry(2, 32, 16, Math.PI / 3, Math.PI / 3);
  const leaf = new THREE.Group();
  const leaf1 = new THREE.Mesh(leafGeometry, leafMaterial);
  leaf1.rotation.x = Math.PI / -2;
  leaf1.position.set(0, 3.2, 2);
  leaf.add(leaf1);
  const leaf2 = new THREE.Mesh(leafGeometry, leafMaterial);
  leaf2.rotation.x = Math.PI / -2;
  leaf2.rotation.z = Math.PI / 2;
  leaf2.position.set(2, 3.2, 0);
  leaf.add(leaf2);
  const leaf3 = new THREE.Mesh(leafGeometry, leafMaterial);
  leaf3.rotation.x = Math.PI / -2;
  leaf3.rotation.z = Math.PI;
  leaf3.position.set(0, 3.2, -2);
  leaf.add(leaf3);
  const leaf4 = new THREE.Mesh(leafGeometry, leafMaterial);
  leaf4.rotation.x = Math.PI / -2;
  leaf4.rotation.z = Math.PI / -2;
  leaf4.position.set(-2, 3.2, 0);
  leaf.add(leaf4);
  tree.add(leaf);
  leaf.position.x = -0.4;
  leaf.rotation.z = THREE.MathUtils.degToRad(-10);

  // 야자나무 전체 추가
  scene.add(tree);
  tree.position.x = 2;
  
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
