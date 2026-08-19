import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import * as THREE from "three"

export default function ThreePage() {
    const containerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const scene = new THREE.Scene()
        scene.background = new THREE.Color("#f8fafc")

        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / Math.max(container.clientHeight, 1), 0.1, 1000)
        camera.position.set(0, 0, 3)

        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setSize(container.clientWidth, container.clientHeight, false)
        container.appendChild(renderer.domElement)

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        directionalLight.position.set(2, 2, 2)
        scene.add(ambientLight, directionalLight)

        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshStandardMaterial({
            color: 0x4f46e5,
            metalness: 0.2,
            roughness: 0.7,
        })
        const cube = new THREE.Mesh(geometry, material)
        scene.add(cube)

        let frameId: number | undefined
        const renderFrame = () => {
            cube.rotation.x += 0.01
            cube.rotation.y += 0.015
            renderer.render(scene, camera)
            frameId = window.requestAnimationFrame(renderFrame)
        }

        const resizeObserver = new ResizeObserver(() => {
            const width = container.clientWidth
            const height = Math.max(container.clientHeight, 1)
            camera.aspect = width / height
            camera.updateProjectionMatrix()
            renderer.setSize(width, height, false)
        })
        resizeObserver.observe(container)

        renderFrame()

        return () => {
            if (frameId !== undefined) window.cancelAnimationFrame(frameId)
            resizeObserver.disconnect()
            geometry.dispose()
            material.dispose()
            renderer.dispose()
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement)
            }
        }
    }, [])

    return (
        <div className="flex min-h-svh flex-col bg-slate-50">
            <div className="flex items-center gap-4 border-b bg-white px-6 py-4">
                <Link to="/" className="text-sm text-primary underline-offset-4 hover:underline">
                    返回首页
                </Link>
                <div>
                    <h1 className="text-base font-medium">Three.js 3D 演示</h1>
                    <p className="text-sm text-muted-foreground">当前示例渲染了一个可旋转立方体，后续可以替换成真实模型加载。</p>
                </div>
            </div>

            <div className="flex-1 p-6">
                <div ref={containerRef} className="h-[70vh] overflow-hidden rounded-2xl border bg-white shadow-sm" />
            </div>
        </div>
    )
}
