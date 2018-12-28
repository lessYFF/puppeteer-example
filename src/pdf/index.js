import BaseClass from '../base/index';

class CreatePDF extends BaseClass {
    constructor(props) {
        super(props);
        this.actionList.push(this.createPDFFn);
    }

    /**
     * 创建pdf方法
     */
    async createPDFFn() {
        try {
            const page = await this.browser.newPage();
            await page.goto('https://music.163.com');
            await page.pdf({ path: 'src/data/misuc.pdf', format: 'A4' });
        } catch (err) {
            console.error('createPDFFn error', err);
        }
    }
}

export default CreatePDF;
