import BaseClass from '../base/index';

class ShotScreen extends BaseClass {
    constructor(props) {
        super(props);
        const actionList = [
            this.createShotScreen,
            this.createShotScreenWithoutImage,
        ];
        this.actionList.push(...actionList);
    }

    /**
     * 截屏方法-有图
     */
    async createShotScreen() {
        try {
            const page = await this.browser.newPage();

            await page.goto('https://music.163.com');
            await page.screenshot({ path: 'src/data/misuc.png', fullPage: true });
        } catch (err) {
            console.error('createShotScreen error', err);
        }
    }

    /**
     * 截屏方法-无图
     */
    async createShotScreenWithoutImage() {
        try {
            const page = await this.browser.newPage();

            await page.setRequestInterception(true);
            page.on('request', request => {
                if (request.resourceType() === 'image')
                    request.abort();
                else
                    request.continue();
            });
            await page.goto('https://music.163.com');
            await page.screenshot({ path: 'src/data/misuc_no_image.png', fullPage: true });
        } catch (err) {
            console.error('createShotScreenWithoutImage error', err);
        }
    }
}

export default ShotScreen;
