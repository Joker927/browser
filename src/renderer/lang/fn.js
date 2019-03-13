function setLanguages() {
    let lang = navigator.language
    switch (lang) {
        case 'zh-CN':
            return 'zh'
        case 'zh-TW':
        case 'zh-HK':
            return 'tw'
        default:
            return 'en'
    }
}
export default setLanguages
