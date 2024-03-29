import * as THREE from "three";
import WebGL from '../../node_modules/three/examples/jsm/capabilities/WebGL.js';

// html에서 canvase를 세팅하여 가져옴.
const $result = document.getElementById('result');

// WebGL 호환될때만 호출
if (WebGL.isWebGLAvailable()) {

  // 기본요소 1. Scene : 화면에 보여주려는 객체를 담는 공간
  // Scene()을 통해 장면 생성
  // 이 후 add()로 장면을 추가하면 된다.
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xFFE187)

  // 기본요소 2. Camera : Scene를 바라볼 시점을 결정
  // PerspectiveCamera는 가장 많이 사용 (원근감을 적용하여 3D공간감을 표현)
  // 파라미터는 (시야각, 현재윈도우종횡비, 최소거리, 최대거리)
  // 여기서 50은 시야각인데 화각이라고 봐도 될 듯?
  // 카메라로부터 최소거리~최대거리만 현재윈도우종횡비로 렌더한다.
  // const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  const camera = new THREE.PerspectiveCamera(50, $result.clientWidth / $result.clientHeight, 0.1, 1000);
  // 윈도우의 비율이 아닌, 세팅된 canvase의 비율로 설정
  
  // 카메라의 위치 변경
  camera.position.set(3, 3, 3);
  // 카메라의 시선 변경
  camera.lookAt(0, 0, 0);

  // 기본요소 3. Renderer : Scene-Camera, 화면을 그려주는 역할
  // domElement 는 canvas 요. 이걸 body에 추가하면
  // body에 canvas가 그려진다.
  // const renderer = new THREE.WebGLRenderer()
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);

  // html에 세팅한 canvas로 세팅.
  // 하지만 설정한 canvase와 렌더하는 사이즈가 맞지 않아서 계단 현상 발생
  // (1) antialias: true 추가 (울퉁불퉁 현상을 방지)
  // (2) 렌더러 사이즈를 canvase 사이즈로 변경 (애초에 렌더에서 그려지는 사이즈가 작은게 문제니까...)
  const renderer = new THREE.WebGLRenderer({
    canvas: $result, antialias: true
  })
  renderer.setSize($result.clientWidth, $result.clientHeight);

  // 빛 (사물을 보기 위해 빛이 필요하다.)
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(0, 2, 4);
  scene.add(pointLight);

  // 박스 생성
  // 도형과 재질을 설정하고 Mesh로 인스턴스 생성 그리고 add로 Scene에 추가
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0x2E6FF2 })
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Scene와 Camera를 연결
  renderer.render(scene, camera);
} else {
  document.body.appendChild(WebGL.getWebGLErrorMessage())
}
