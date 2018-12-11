import { Loading } from 'element-ui';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
let loading = {
}
let loadingInstance = null;

let lastRequest = new Date('2018');

loading.show = function (config) {
    if (config && config.loading) {
        let now = new Date();
        let ms = now - lastRequest;
        lastRequest = now;
        if (ms > config.loading.interval || 2000) {//默认相隔超过两秒的请求才重新显示loading
            if (config.loading.type === "loading") {
                loadingInstance = Loading.service(config.loading.options)
            } else if (config.loading.type === "nprogress") {
                NProgress.start()
            }
        }
    }

}

loading.hide = function (config) {
    if (config && config.loading) {
        if (config.loading.type === "loading" && loadingInstance) {
            loadingInstance.close();
            loadingInstance = null;
        } else if (config.loading.type === "nprogress") {
            NProgress.done()
        }
    }
}

export default loading;