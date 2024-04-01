import * as THREE from "three";
import WebGL from '../../node_modules/three/examples/jsm/capabilities/WebGL.js';
import { OrbitControls } from "../../node_modules/three/examples/jsm/controls/OrbitControls.js";

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
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
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
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 빛 (사물을 보기 위해 빛이 필요하다.)
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(0, 2, 4);
  scene.add(pointLight);

  /** =================== Geometry 종류 ===================*/

  // 박스 생성
  // 도형과 재질을 설정하고 Mesh로 인스턴스 생성 그리고 add로 Scene에 추가
  const blue = new THREE.MeshStandardMaterial({ color: '#0E3057' })
  const gray = new THREE.MeshStandardMaterial({ color: '#D4D4D4' })
  const white = new THREE.MeshStandardMaterial({ color: '#FFFFFF' })
  const gold = new THREE.MeshStandardMaterial({ color: '#FFC269' })
  const black = new THREE.MeshStandardMaterial({ color: '#000000' })
  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);

  // 1. 육면체 생성 (x, y, z)
  // const geo1 = new THREE.BoxGeometry(1, 1, 1);
  // const obj1 = new THREE.Mesh(geo1, material);
  // scene.add(obj1);
  
  // 2. 원뿔 생성 (반지름길이, 높이, 분할면)
  // const geo2 = new THREE.ConeGeometry(0.5, 1, 30);
  // const obj2 = new THREE.Mesh(geo2, material);
  // scene.add(obj2);

  

  const back = new THREE.Group();
  const cylinder3 = new THREE.CylinderGeometry(0.25, 0.25, 0.2, 30, 3);
  const cylinder3_sub = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 30, 3);
  const cylinder4 = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 30, 3);
  // 태엽1
  const back1 = new THREE.Mesh(cylinder3, gray);
  back1.position.x = -0.25;
  back.add(back1);
  // sub1
  const back1_sub = new THREE.Mesh(cylinder3_sub, black);
  back1_sub.position.x = -0.25;
  back.add(back1_sub);

  // 태엽2
  const back2 = new THREE.Mesh(cylinder3, gray);
  back2.position.x = 0.25;
  back.add(back2);
  // sub2
  const back2_sub = new THREE.Mesh(cylinder3_sub, black);
  back2_sub.position.x = 0.25;
  back.add(back2_sub);
  // 태엽 중앙
  const back3_center = new THREE.Mesh(cylinder3, gray);
  back3_center.position.z = -0.16;
  back3_center.scale.x = 1.5;
  back3_center.scale.z = 0.7;
  back.add(back3_center);
  // 태엽 연결 
  const back4 = new THREE.Mesh(cylinder4, gray);
  back4.position.z = -0.3;
  back4.rotation.x = THREE.MathUtils.degToRad(90);
  back.add(back4);
  back.rotation.x = THREE.MathUtils.degToRad(180);
  back.rotation.z = THREE.MathUtils.degToRad(50);
  back.position.z = -1.6;
  back.scale.set(1.5, 1.5, 1.5);
  scene.add(back);

  // 모자
  const hat = new THREE.Group();
  const cylinder2 = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 30);
  const hat2 = new THREE.Mesh(cylinder2, gray);
  hat2.position.y = 1.3;
  hat.add(hat2);
  // 모자 실
  const cylinder = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 30);
  const hat1 = new THREE.Mesh(cylinder, gray);
  hat1.position.y = 1;
  hat.add(hat1);
  scene.add(hat);
  
  // 4. 구 생성 (반지름, 분할면)
  const sphere = new THREE.SphereGeometry(1, 50);
  const body = new THREE.Mesh(sphere, blue);
  scene.add(body);
  
  // 눈
  const eyes = new THREE.Group();
  const sphere2 = new THREE.SphereGeometry(0.13, 50);
  const eye1 = new THREE.Mesh(sphere2, white);
  const eye2 = new THREE.Mesh(sphere2, white);
  eye1.position.x = 0.3;
  eye1.scale.y = 2;
  eye2.position.x = -0.3;
  eye2.scale.y = 2;
  eyes.add(eye1);
  eyes.add(eye2);
  eyes.position.z = 0.9;
  scene.add(eyes);

  // 다리
  const legs = new THREE.Group();
  const sphere3 = new THREE.SphereGeometry(0.4, 30);
  const leg1 = new THREE.Mesh(sphere3, gold);
  leg1.scale.z = 1.5;
  leg1.scale.y = 0.8;
  leg1.position.x = -0.5;
  leg1.position.y = -1;
  leg1.position.z = 0.3;
  legs.add(leg1);
  const leg2 = new THREE.Mesh(sphere3, gold);
  leg2.scale.z = 1.5;
  leg2.scale.y = 0.8;
  leg2.position.x = 0.5;
  leg2.position.y = -1;
  leg2.position.z = 0.3;
  legs.add(leg2);
  scene.add(legs);

  //------------

  // 5. 평면 생성 (넓이, 높이)
  // const geo5 = new THREE.PlaneGeometry(1, 2);
  // const obj5 = new THREE.Mesh(geo5, material);
  // scene.add(obj5);

  // 6. 평면(원) 생성 (넓이, 높이)
  // const geo6 = new THREE.CircleGeometry(1, 32);
  // const obj6 = new THREE.Mesh(geo6, material);
  // scene.add(obj6);

  // 7. 튜브 생성 (전체반지름, 구멍 제외 반지름)
  // const geo7 = new THREE.TorusGeometry(1, 0.5);
  // const obj7 = new THREE.Mesh(geo7, material);
  // scene.add(obj7);

  /** =================== Material 종류 =================== */

  // 재질 확인용 형태
  // const testMetry = new THREE.BoxGeometry(1, 1, 1);
  
  // 1. 단색 재질 (MeshBasicMaterial) : 명암 표현이 안되기 때문에 출력 확인용
  // const basic = new THREE.MeshBasicMaterial({
  //   // color : 색상
  //   color: 0x2E6FF2,
  //   // wireframe : 와이어프레임(뼈대)
  //   wireframe: false,
  //   // transparent, opacity : 투명도
  //   transparent: true,
  //   opacity: 0.5,
  // })
  // 2. 표준 재질 (MeshStandardMaterial) : 가장 일반적, 언리얼에서 표준 재질, 명암 표현과 질감표현이 가능
  // const standard = new THREE.MeshStandardMaterial({
  //   color: 0x2E6FF2,
  //   // 거칠기
  //   roughness: 0.2,
  //   // 금속질감
  //   metalness: 0.8,
  //   // 텍스쳐 연결
  //   // map:
  //   // 사이드 속성 (렌더링할 면 결정) - 기본값이 FrontSide
  //   // side: THREE.BackSide
  // });
  // 3. 피지컬 재질 (MeshPhysicalMaterial) : 스탠다드의 확장 재질,
  // 고급 물리 기반 렌더링 제공, 더 많은 물리적 특성을 추가할 수 있음(반투명이라던가)
  // const physical = new THREE.MeshPhysicalMaterial({
  //   color: 0x2E6FF2,
  // })
  // 4. 퐁 재질 (MeshPhongMaterial) : 광택이 있는 표현 가능
  // const phong = new THREE.MeshPhongMaterial({
  //   color: 0x2E6FF2,
  //   // 광택
  //   shininess: 38,
  //   // 반사광
  //   specular: 0x2E6FF2,
  // })
  // const mesh = new THREE.Mesh(testMetry, phong);
  // scene.add(mesh);

  // side 속성 실험 (BackSide시에 뒷면만 보인다)
  // const plane = new THREE.Mesh((
  //   new THREE.PlaneGeometry(1, 1)
  // ), standard);
  // scene.add(plane);

  /** =================== Mesh 조작 =================== */

  // mesh 조작용 도형, 재질, 씬에 add
  // const geometry = new THREE.DodecahedronGeometry(1);
  // const material = new THREE.MeshStandardMaterial({
  //   color: 0x2E6FF2,
  // });
  // const mesh = new THREE.Mesh(geometry, material);
  // scene.add(mesh);

  // 0. 좌표축 표시 - AxesHelper(크기)
  // scene, mesh에 추가할 수 있음
  // const axesHelper = new THREE.AxesHelper(10);
  // scene.add(axesHelper);

  // 1. 위치 조작
  // mesh.position.x = 2;
  // mesh.position.y = 1;
  // mesh.position.set(0, 2, 1);

  // 2. 회전 조작
  // mesh.rotation.y = 360;
  // 회전의 기준이 라디안 값이라 다르게 출력된다.
  // 내가 아는 각도로 변경되도록 degToRad 메서드를 사용
  // mesh.rotation.y = THREE.MathUtils.degToRad(360);

  // 3. 크기 조작
  // mesh.scale.x = 1.2;
  // mesh.scale.y = 0.1;

  // Scene와 Camera를 연결
  renderer.render(scene, camera);

  /** =================== 애니메이션 =================== */
  
  // OrbitControls(카메라, 렌더러DOM요소)
  const controls = new OrbitControls(camera, renderer.domElement);

  // 오비컨트롤 설정
  // 1. 줌 가능여부
  controls.enableZoom = true;
  // 2. 회전 가능여부
  controls.enableRotate = true;
  // 3. 마우스로 이동 가능여부
  controls.enablePan = true;
  // 4. 조작범위 (최소거리, 최대거리, 회전각도)
  // controls.minDistance = 2;
  // controls.maxDistance = 20;
  // controls.maxPolarAngle = Math.PI / 3;
  // 5. 자동회전 여부, 스피드(음수는 반대방향)
  // controls.autoRotate = true;
  // controls.autoRotateSpeed = -30;
  // 6. 회전 시 관성여부
  controls.enableDamping = true;

  // 애니메이션을 화면에 출력
  function animate() {
    // 박스를 회전 + 렌더
    renderer.render(scene, camera);
    // 오비컨트롤 업데이트
    controls.update();
    // 콜백함수를 animate로 등록하여 계속 반복...
    requestAnimationFrame(animate);
  }
  
  animate(); // ==> 박스를 회전 + 렌더를 계속 반복함

  /** =================== 이벤트 =================== */
  
  // // resize 이벤트 추가 (화면 사이즈 변경 이벤트)
  // window.addEventListener('resize', () => {
  //   // 1. 카메라의 종횡비 변경
  //   // updateProjectionMatrix로 속성 업데이트
  //   camera.aspect = window.innerWidth / window.innerHeight;
  //   camera.updateProjectionMatrix();

  //   // 2. 렌더러의 크기 변경 (현재 윈도우의 크기)
  //   renderer.setSize(window.innerWidth, window.innerHeight);
  // }); // ==> 화면 크기를 변경하면 렌더러의 크기도 변경된다.

} else {
  document.body.appendChild(WebGL.getWebGLErrorMessage())
}
