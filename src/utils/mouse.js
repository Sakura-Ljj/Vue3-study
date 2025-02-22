import { ref, onMounted, onUnmounted } from 'vue'

const useMouse = () => {
    const x = ref(0)
    const y = ref(0)

    const update = (e) => {
        x.value = e.pageX
        y.value = e.pageY
    }

    onMounted(() => {
        window.addEventListener('mousemove', update)
    })

    onUnmounted(() => {
        window.removeEventListener('mousemove', update)
    })

    return { x, y }
}

export { useMouse }
