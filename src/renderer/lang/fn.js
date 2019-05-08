function setLanguages() {
    let lang = navigator.language
    switch (lang) {
        case 'zh-CN':
            return 'zh-CN'
        case 'zh-TW':
        case 'zh-HK':
            return 'zh-TW'
        default:
            return 'en-US'
    }
}
export default setLanguages
