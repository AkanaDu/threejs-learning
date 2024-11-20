/*
 * @Author: Du.Kang banshee1115@163.com
 * @Date: 2024-06-13 20:47:38
 * @LastEditors: AkanaDu banshee1115@163.com
 * @LastEditTime: 2024-11-20 13:59:11
 * @FilePath: /threejs-learning/script.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Textures
const textureLoader = new THREE.TextureLoader();
// 新增一个方形的材质加载器（天空盒）
const cubeTextureLoader = new THREE.CubeTextureLoader();

const doorColorTexture = textureLoader.load("/static/door/color.jpg");
const matcapTexture = textureLoader.load("/static/matcaps/8.png");
const gradientTexture = textureLoader.load("/static/gradients/3.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/static/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load('"/static/door/height.jpg"');
const doorMetalnessTexture = textureLoader.load('"/static/door/metalness.jpg"');
const doorRoughnessTexture = textureLoader.load('"/static/door/roughness.jpg"');
const doorNormalTexture = textureLoader.load('"/static/door/normal.jpg"');
const doorAlphaTexture = textureLoader.load("/static/door/alpha.jpg");
// const doorColorTexture = textureLoader.load('/door/color.jpg')
// const doorColorTexture = textureLoader.load('/door/color.jpg')

gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;

const environmentMapTexture = cubeTextureLoader.load([
  "/static/environmentMap/px.jpeg",
  "/static/environmentMap/nx.jpeg",
  "/static/environmentMap/py.jpeg",
  "/static/environmentMap/ny.jpeg",
  "/static/environmentMap/pz.jpeg",
  "/static/environmentMap/nz.jpeg",
]);
// Size
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Resize
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Full Screen
window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;
  if (!fullscreenElement) {
    console.log("go fullscreen");
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitFullscreenElement) {
      canvas.webkitFullscreenElement();
    }
  } else {
    console.log("leave fullscreen");
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});

// Cursor
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1) // 创建几何体
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true }) // 创建 材质
// const mesh = new THREE.Mesh(geometry, material) // 创建网格体
// scene.add(mesh) // 将网格体添加至场景中

// Material
// const material = new THREE.MeshBasicMaterial({
//   map: doorColorTexture
// })
// const material = new THREE.MeshNormalMaterial() // 法线材质贴图
// material.flatShading = true
// const material = new THREE.MeshMatcapMaterial();
// material.shininess = 1000;
// material.matcap = matcapTexture;

// 卡通渲染
// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture;

// 金属渲染
const material = new THREE.MeshStandardMaterial();
material.metalness = 1;
material.roughness = 0;
material.envMap = environmentMapTexture;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.05;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMapMap = doorAlphaTexture;

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);
sphere.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
);
torus.position.x = -1.5;

scene.add(sphere, plane, torus);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height); // 视角 长宽比
// const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100) // 画面是扁的
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// )
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3;
// camera.lookAt(mesh.position)
scene.add(camera); // 场景中添加相机

// Lights
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 1000);
// pointLight.position.x = 4;
// pointLight.position.y = 4;
// pointLight.position.z = 4;
// scene.add(pointLight);

// Controls
const controls = new OrbitControls(camera, canvas); // 使用轨道控制器控制camera
controls.enableDamping = true; // 开启轨道阻尼

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
}); // 创建渲染器
renderer.setSize(sizes.width, sizes.height); // 设置绘画高度

// Clock
const clock = new THREE.Clock();

// Animations
const tick = () => {
  // Time
  const elapsedTime = clock.getElapsedTime();

  // Update object
  // mesh.rotation.x = elapsedTime
  // mesh.rotation.y = elapsedTime
  // mesh.rotation.z = elapsedTime

  // Update camera
  // camera.position.x = cursor.x * 10
  // camera.position.y = cursor.y * 10
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
  // camera.position.y = cursor.y * 10
  // camera.lookAt(new THREE.Vector3()) // 或者使用mesh.position 因为都是0 0 0

  // update
  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  plane.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Controls
  controls.update();

  // Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
