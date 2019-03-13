import './index.css'
export default {
    bind(el, binding) {
        el.dataset.tip = binding.value

        el.addEventListener('mouseover', () => {
            el.classList.add('_tips')
        })
        el.addEventListener('mouseout', () => {
            el.classList.remove('_tips')
        })
    }
}
