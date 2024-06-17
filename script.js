/*
 * @Author: Du.Kang banshee1115@163.com
 * @Date: 2024-06-13 20:47:38
 * @LastEditors: Du.Kang banshee1115@163.com
 * @LastEditTime: 2024-06-17 23:28:33
 * @FilePath: /threejs-learning/script.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Size
const sizes = { 
  width: 800,
  height: 600
}

// Cursor
const cursor = {
  x: 0,
  y: 0 
}
window.addEventListener('mousemove', (event) => { 
  cursor.x = (event.clientX / sizes.width - 0.5)
  cursor.y = - (event.clientY / sizes.height - 0.5)
  console.log(cursor.x)
})

// Canvas
const canvas = document.querySelector('canvas.webgl') 

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1) // 创建几何体
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true }) // 创建 材质
const mesh = new THREE.Mesh(geometry, material) // 创建网格体
scene.add(mesh) // 将网格体添加至场景中 



// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height) // 视角 长宽比 
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
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera) // 场景中添加相机

// Controls
const controls = new OrbitControls(camera, canvas) // 使用轨道控制器控制camera
controls.enableDamping = true // 开启轨道阻尼

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas 
}) // 创建渲染器 
renderer.setSize(sizes.width, sizes.height) // 设置绘画高度

// Clock
const clock = new THREE.Clock()

// Animations
const tick = () => {
  // Time
  const elapsedTime = clock.getElapsedTime()
  
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
  controls.update()
  
  // Render
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()

