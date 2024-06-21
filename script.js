/*
 * @Author: Du.Kang banshee1115@163.com
 * @Date: 2024-06-13 20:47:38
 * @LastEditors: Du.Kang banshee1115@163.com
 * @LastEditTime: 2024-06-21 15:30:57
 * @FilePath: /threejs-learning/script.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import gsap from 'gsap'
import GUI from 'lil-gui' 

// Debug
const gui = new GUI()
const debugObject = {}
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

debugObject.color = '#df0cb1'

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2) // 创建几何体
const material = new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: true}) // 创建 材质
const mesh = new THREE.Mesh(geometry, material) // 创建网格体
scene.add(mesh) // 将网格体添加至场景中 

const cubeTweaks = gui.addFolder('可配置的立方体')
cubeTweaks.close() // 收起控制项目
// gui.add(mesh.position, 'y', -3, 3, 0.01)
cubeTweaks.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('elevation') // 作用同上，但是可以修改名称，将y修改为elevation
cubeTweaks.add(mesh, 'visible') // 更改显示
cubeTweaks.add(material, 'wireframe') // 更换材质
cubeTweaks.addColor(debugObject, 'color').onChange((value) => {
  // console.log('颜色value已经被改变')
  // console.log(value.getHexString())
  material.color.set(debugObject.color)
})

debugObject.spin = () => { 
  gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2 })
}
cubeTweaks.add(debugObject, 'spin')

// cubeTweaks.add(geometry, 'widthSegments') // 这个不能直接使用
debugObject.subdivision = 2
cubeTweaks.add(debugObject, 'subdivision').min(1).max(20).step(1).onFinishChange(value => {
  // 避免内存泄漏，首先销毁原来的几何体
  mesh.geometry.dispose()
  mesh.geometry = new THREE.BoxGeometry(1, 1, 1, value,value,value)
}) // 划分

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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

