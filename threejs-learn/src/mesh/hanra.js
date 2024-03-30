import * as THREE from "three";
export default function printHanra() {
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

  return hanra;
}
