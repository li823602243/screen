export default {
    install(Vue, options) {
        Vue.prototype.interval = function (fc,time) {
            setInterval(() => {
                fc
            }, time);
        }
    }

}