/*
 * @Author: Du.Kang banshee1115@163.com
 * @Date: 2024-06-13 20:47:38
 * @LastEditors: Du.Kang banshee1115@163.com
 * @LastEditTime: 2024-06-13 23:43:18
 * @FilePath: /threejs-learning/script.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three'
import { Wireframe } from 'three/examples/jsm/Addons.js'

// Canvas
const canvas = document.querySelector('canvas.webgl') 

// Scene
const scene = new THREE.Scene()

// Object
const group = new THREE.Group()
group.position.y = 1
group.scale.y = 2
group.rotation.y = 1
scene.add(group)

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1) ,
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
group.add(cube1)

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1) ,
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
cube2.position.x = -2
group.add(cube2)

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1) ,
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
)
cube3.position.x = 2
group.add(cube3)


// Axes helper
const axes = new THREE.AxesHelper()
scene.add(axes)

// Size
const sizes = { 
  width: 800,
  height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height) // 视角 长宽比 
camera.position.z = 3
// camera.position.y = 1
// camera.position.x = 1
scene.add(camera) // 场景中添加相机

// camera.lookAt(new THREE.Vector3(3, 0, 0)) // 相机看向 （3， 0， 0）坐标方向
// camera.lookAt(mesh.position) // 相机看向mesh的中心点

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas 
}) // 创建渲染器 
renderer.setSize(sizes.width, sizes.height) // 设置绘画高度
renderer.render(scene, camera)

