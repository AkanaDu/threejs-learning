import "./style.css";
import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

// Debug
const gui = new GUI();

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

const fontLoader = new FontLoader();
fontLoader.load(
  "/static/fonts/helvetiker_regular.typeface.json",
  function (font) {
    const textGeometry = new TextGeometry("C I T I C", {
      font: font,
      size: 80,
      depth: 5,
      curveSegments: 6,
      bevelEnabled: true,
      bevelThickness: 10,
      bevelSize: 8,
      bevelOffset: 0,
      bevelSegments: 3,
    });
    const textMaterial = new THREE.MeshBasicMaterial({ color: "red" });
    textMaterial.wireframe = true;
    const textMesh = new THREE.Mesh(textGeometry, textMaterial); // 创建网格体
    scene.add(textMesh); // 将网格体添加至场景中
  }
);

const axes = new THREE.AxesHelper();
scene.add(axes);

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1); // 创建几何体
// const material = new THREE.MeshBasicMaterial({ color: 0xe875e5 }); // 创建 材质
// const mesh = new THREE.Mesh(geometry, material); // 创建网格体
// scene.add(mesh); // 将网格体添加至场景中

// // gui.add(mesh.position, 'y', -3, 3, 0.01)
// gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation"); // 作用同上，但是可以修改名称，将y修改为elevation
// gui.add(mesh, "visible"); // 更改显示
// gui.add(material, "wireframe"); // 更换材质
// gui.addColor(material, "color").onChange((value) => {
//   console.log("颜色value已经被改变");
//   console.log(value.getHexString());
// });

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
// camera.lookAt(textMesh.position);
scene.add(camera); // 场景中添加相机

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

  // Controls
  controls.update();

  // Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
