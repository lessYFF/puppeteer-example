import puppeteer from 'puppeteer';

const createPDF = async () => {
    try {
        // md 目前只支持绝对路径
        const browser = await puppeteer.launch({
            executablePath: 'src/chromium/Chromium.app/Contents/MacOS/Chromium',
        });
        const page = await browser.newPage();
        await page.goto('https://music.163.com');
        await page.pdf({ path: 'src/images/misuc.pdf', format: 'A4' });
        await browser.close();
    } catch (err) {
        console.error('createPDF error', err);
    }
};

export default createPDF;
