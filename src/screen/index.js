import puppeteer from 'puppeteer';

const shotScreen = async (isShowBlockImage = true ) => {
    try {
        // md 目前只支持绝对路径
        const browser = await puppeteer.launch({
            slowMo: 1000,
            headless: false,
            executablePath: 'src/chromium/Chromium.app/Contents/MacOS/Chromium',
        });
        const page = await browser.newPage();
        let imagePath = 'src/images/misuc.png';
        if (!isShowBlockImage) {
            await page.setRequestInterception(true);
            imagePath = 'src/images/misuc_no_image.png'
            page.on('request', request => {
                if (request.resourceType() === 'image')
                    request.abort();
                else
                    request.continue();
            });
        }
        await page.goto('https://music.163.com');
        await page.screenshot({ path: imagePath, fullPage: true});
        await browser.close();
    } catch (err) {
        console.error('createPDF error', err);
    }
};

export default shotScreen;
