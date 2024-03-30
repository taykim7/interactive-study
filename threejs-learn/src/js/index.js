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
  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0x2E6FF2 })
  // const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);

  // 육면체 생성 (x, y, z)
  // const geo1 = new THREE.BoxGeometry(1, 1, 1);
  // const obj1 = new THREE.Mesh(geo1, material);
  // scene.add(obj1);
  
  // 원뿔 생성 (반지름길이, 높이, 분할면)
  // const geo2 = new THREE.ConeGeometry(0.5, 1, 30);
  // const obj2 = new THREE.Mesh(geo2, material);
  // scene.add(obj2);

  // 원기둥 생성 (윗면 반지름, 아랫면 반지름, 높이, 분할면)
  // const geo3 = new THREE.CylinderGeometry(0.5, 0.8, 1, 10);
  // const obj3 = new THREE.Mesh(geo3, material);
  // scene.add(obj3);

  // 구 생성 (반지름, 분할면)
  // const geo4 = new THREE.SphereGeometry(1, 20);
  // const obj4 = new THREE.Mesh(geo4, material);
  // scene.add(obj4);

  // 평면 생성 (넓이, 높이)
  // const geo5 = new THREE.PlaneGeometry(1, 2);
  // const obj5 = new THREE.Mesh(geo5, material);
  // scene.add(obj5);

  // 평면(원) 생성 (넓이, 높이)
  // const geo6 = new THREE.CircleGeometry(1, 32);
  // const obj6 = new THREE.Mesh(geo6, material);
  // scene.add(obj6);

  // 튜브 생성 (전체반지름, 구멍 제외 반지름)
  const geo7 = new THREE.TorusGeometry(1, 0.5);
  const obj7 = new THREE.Mesh(geo7, material);
  scene.add(obj7);

  // Scene와 Camera를 연결
  renderer.render(scene, camera);

  // 애니메이션을 화면에 출력
  function animate() {
    // 박스를 회전 + 렌더
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
    // 콜백함수를 animate로 등록하여 계속 반복...
    requestAnimationFrame(animate);
  }
  
  animate(); // ==> 박스를 회전 + 렌더를 계속 반복함

  // resize 이벤트 추가 (화면 사이즈 변경 이벤트)
  window.addEventListener('resize', () => {
    // 1. 카메라의 종횡비 변경
    // updateProjectionMatrix로 속성 업데이트
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // 2. 렌더러의 크기 변경 (현재 윈도우의 크기)
    renderer.setSize(window.innerWidth, window.innerHeight);
  }); // ==> 화면 크기를 변경하면 렌더러의 크기도 변경된다.

} else {
  document.body.appendChild(WebGL.getWebGLErrorMessage())
}
