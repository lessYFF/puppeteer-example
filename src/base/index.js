import puppeteer from 'puppeteer';

class BaseClass {
    constructor(options) {
        this.browser = '';  // 浏览器对象
        this.actionList = []; // 待处理事务列表
        this.configOptions = Object.assign({
            slowMo: 1000,
            headless: false,
            // executablePath: 'src/chromium/Chromium.app/Contents/MacOS/Chromium',
        }, options); // 构建浏览器配置
        this.init = this.init.bind(this);
    }

    /**
     * 初始化浏览器
     */
    async init() {
        try {
            // md 目前只支持绝对路径
            this.browser = await puppeteer.launch(this.configOptions);
            for (let action of this.actionList) {
                await action.call(this);
            }

            await this.browser.close();
        } catch (err) {
            console.error('init error', err);
        }
    }
}

export default BaseClass;