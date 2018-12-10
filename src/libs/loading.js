import { Loading } from 'element-ui';
let loading = {

}
let loadingInstance = null;

let lastRequest = new Date('2018');

loading.show = function (config) {
    if (config && config.loading) {
        let now = new Date();
        let ms = now - lastRequest;
        lastRequest = now;
        if (ms > 2000) {//相隔超过两秒的请求才重新显示loading
            if (config.loading.type === "loading") {
                loadingInstance = Loading.service(config.loading.options)
            }
        }
    }

}

loading.hide = function (config) {
    if (config && config.loading) {
        if (config.loading.type === "loading" && loadingInstance) {
            loadingInstance.close();
            loadingInstance = null;
        }
    }
}

export default loading;