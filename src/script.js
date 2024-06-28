/*
 * @Author: Du.Kang banshee1115@163.com
 * @Date: 2024-06-13 20:47:38
 * @LastEditors: Du.Kang banshee1115@163.com
 * @LastEditTime: 2024-06-28 15:51:14
 * @FilePath: /threejs-learning/script.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// 从static文件中获取img
// const img = new Image()
// const texture = new THREE.Texture(img)
// img.onload = () => {
//   texture.needsUpdate = true
// }
// img.src = '/color.jpg'

// Textures
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () => {
  console.log('on start')
}
loadingManager.onLoaded = () => {
  console.log('on loaded')
}
loadingManager.onProgress = () => {
  console.log('on progress') 
}
loadingManager.onError = () => {
  console.log('on error')
}
const textureLoader = new THREE.TextureLoader(loadingManager)
// const colorTexture = textureLoader.load('/color.jpg')
// const colorTexture = textureLoader.load('/checkerboard-8x8.png')
const colorTexture = textureLoader.load('/minecraft.png')
// const alphaTexture = textureLoader.load('/alpha.jpg')
// const heightTexture = textureLoader.load('/height.jpg')
// const normalTexture = textureLoader.load('/normal.jpg')
// const ambientOcclusionTexture = textureLoader.load('/ambientOcclusion.jpg')
// const metalnessTexture = textureLoader.load('/metalness.jpg')
// const roughnessTexture = textureLoader.load('/roughness.jpg')
// textureLoader可以加载多种材质 例如再增加一个材质也是可以的
// const texture2 = textureLoader.load('/color2.jpg')

// 设置材质的UV
// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.MirroredRepeatWrapping // S镜像
// colorTexture.wrapT = THREE.MirroredRepeatWrapping // T镜像
// 材质偏移
// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5
// 材质旋转
// colorTexture.rotation = Math.PI / 4
// 材质轴旋转
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5
colorTexture.generateMipmaps = false
// colorTexture.minFilter = THREE.NearestFilter // 纹理会变得十分清晰
colorTexture.magFilter = THREE.NearestFilter // 纹理会变得十分锐利


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
const geometry = new THREE.BoxGeometry(1, 1, 1) // 创建几何体
const material = new THREE.MeshBasicMaterial({ map: colorTexture }) // 创建 材质
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

