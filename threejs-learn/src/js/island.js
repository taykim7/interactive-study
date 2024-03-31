import * as THREE from "three";
import WebGL from '../../node_modules/three/examples/jsm/capabilities/WebGL.js';
import { OrbitControls } from "../../node_modules/three/examples/jsm/controls/OrbitControls.js";
import printIsland from '../mesh/island.js';
import printTree from '../mesh/tree.js'
import printHanra from '../mesh/hanra.js'
import printMountain from "../mesh/mountain.js";
import printStone from "../mesh/stone.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const $result = document.getElementById('result');

// WebGL 호환될때만 호출
if (WebGL.isWebGLAvailable()) {
  //--------------------
  // scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#800080')
  // camera
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 20, 20);
  camera.lookAt(0, 0, 0);
  // renderer
  const renderer = new THREE.WebGL1Renderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;
  //--------------------
  // light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionLight = new THREE.DirectionalLight(0xffffff, 1);
  directionLight.position.set(-10, 10, 10);
  scene.add(directionLight);
  directionLight.castShadow = true

  const pl1 = new THREE.PointLight(0xff8c00, 1.5);
  pl1.position.set(5, 0, 0);
  scene.add(pl1);

  const pl2 = new THREE.PointLight(0xffe287, 2);
  pl2.position.set(-3, 2, 0);
  scene.add(pl2);
  // OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true;
  controls.enableRotate = true;
  controls.enablePan = true;
  controls.enableDamping = true;
  // Mesh
  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const materal = new THREE.MeshStandardMaterial({
  //   color: 0xffe272,
  // });
  // const testMesh = new THREE.Mesh(geometry, materal);
  // scene.add(testMesh);

  // 섬
  const island = printIsland();
  scene.add(island);

  // 귤 2개
  const tangerine = printHanra();
  tangerine.scale.set(0.8, 0.8, 0.8);
  tangerine.position.set(-4, 2, -0.5)
  scene.add(tangerine);
  const miniTan = printHanra();
  miniTan.scale.set(0.5, 0.5, 0.5);
  miniTan.position.set(-5, 2, 2.5)
  scene.add(miniTan);

  // 나무 2개
  const tree = printTree();
  tree.position.set(-7, 1, -1);
  scene.add(tree);
  const miniTree = printTree();
  miniTree.scale.set(0.8, 0.8, 0.8);
  miniTree.position.set(6.5, 1, -0.5);
  scene.add(miniTree);

  // 산
  const mountain = printMountain();
  mountain.scale.set(1, 2, 1);
  mountain.position.y = 3;
  scene.add(mountain);

  // 돌하르방
  const stoneMan = printStone();
  stoneMan.position.set(4, 1, -2);
  scene.add(stoneMan);

  // 라이언(외부모델링)
  const modelLoader = new GLTFLoader();
  modelLoader.load('./src/models/Lycat-3d.glb',
    (gltf) => {
      const model = gltf.scene;
      model.position.set(5, 0.5, 2);
      model.rotation.y = Math.PI / -10;
      scene.add(model);
      for (const mesh of model.children) {
        mesh.castShadow = true;
      }
  })
  //--------------------
  function animate() {
    // scene, camera 렌더, 오비콘트롤 업데이트
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);
  }
  animate();
  //--------------------
  // resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
} else {
  document.body.appendChild(WebGL.getWebGLErrorMessage())
}
