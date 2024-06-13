/*
 * @Author: Du.Kang banshee1115@163.com
 * @Date: 2024-06-13 20:47:38
 * @LastEditors: Du.Kang banshee1115@163.com
 * @LastEditTime: 2024-06-13 23:29:38
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
const geometry = new THREE.BoxGeometry(1, 1, 1) // 创建几何体
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true }) // 创建 材质
const mesh = new THREE.Mesh(geometry, material) // 创建网格体
// mesh.position.x = 0.7
// mesh.position.y = - 1.6
// mesh.position.z = 1
scene.add(mesh) // 将网格体添加至场景中 

// Position
mesh.position.set(0.7, -0.6, 1)

// Scale
// mesh.scale.x = 2
// mesh.scale.y = 0.5
// mesh.scale.z = 0.5
mesh.scale.set(2, 0.5, 0.5)

// Rotation
mesh.rotation.reorder('YXZ') // 重新规定rotation转换轴顺序
mesh.rotation.y = Math.PI * 0.25
mesh.rotation.x = Math.PI * 0.25

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

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas 
}) // 创建渲染器 
renderer.setSize(sizes.width, sizes.height) // 设置绘画高度
renderer.render(scene, camera)

