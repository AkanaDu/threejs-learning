/*
 * @Author: Du.Kang banshee1115@163.com
 * @Date: 2024-06-13 20:47:38
 * @LastEditors: Du.Kang banshee1115@163.com
 * @LastEditTime: 2024-06-28 18:20:46
 * @FilePath: /threejs-learning/script.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Textures
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('/static/door/color.jpg')
const matcapTexture = textureLoader.load('/static/matcaps/1.png')
const gradientTexture = textureLoader.load('/static/matcaps/2.png')

// const doorColorTexture = textureLoader.load('/door/color.jpg')
// const doorColorTexture = textureLoader.load('/door/color.jpg')
// Size
const sizes = { 
  width: window.innerWidth,
  height: window.innerHeight
}

// Resize
window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Full Screen
window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
  if (!fullscreenElement) {
    console.log('go fullscreen')
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else if (canvas.webkitFullscreenElement) { 
      canvas.webkitFullscreenElement()
    }
  } else { 
    console.log('leave fullscreen')
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) { 
      document.webkitExitFullscreen()
    }
  }
})

// Cursor
const cursor = {
  x: 0,
  y: 0 
}
window.addEventListener('mousemove', (event) => { 
  cursor.x = (event.clientX / sizes.width - 0.5)
  cursor.y = - (event.clientY / sizes.height - 0.5)
})

// Canvas
const canvas = document.querySelector('canvas.webgl') 

// Scene
const scene = new THREE.Scene()

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1) // 创建几何体
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true }) // 创建 材质
// const mesh = new THREE.Mesh(geometry, material) // 创建网格体
// scene.add(mesh) // 将网格体添加至场景中 

// Material
// const material = new THREE.MeshBasicMaterial({
//   map: doorColorTexture
// })
const material = new THREE.MeshNormalMaterial() // 法线材质贴图

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  material
)
sphere.position.x = 1.5

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  material
)

const torus = new THREE.Mesh( 
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
)
torus.position.x = -1.5

scene.add(sphere, plane, torus)

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
// camera.lookAt(mesh.position)
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

