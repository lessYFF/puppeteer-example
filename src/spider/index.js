import PDFMerge from 'pdf-merge';
import BaseClass from '../base/index';

class CreateSpider extends BaseClass {
    constructor(props) {
        super(props);
        this.actionList.push(this.createSpiderFn);
    }

    /**
     * 创建爬虫方法
     */
    async createSpiderFn() {
        try {
            let page = await this.browser.newPage();
            await page.goto('http://es6.ruanyifeng.com');

            // 爬取导航栏目录列表
            const routerList = await page.evaluate(() => {
                const nodeList = Array.from(document.querySelectorAll('#sidebar ol li a'));
                return nodeList.map(node => {
                        return {
                            name: node.text,
                            href: node.href.trim()
                        }
                });
            });
            await page.close();
            await this.formatPDFContentFn(routerList);
            await this.mergePDfFn(routerList);
        } catch (err) {
            console.error('createSpiderFn error', err);
        }
    }

    /**
     * 格式化打印
     * @param {Array} routerList - 待打印路由
     */
    async formatPDFContentFn(routerList = []) {
        try {
            for (let router of routerList) {
                let page = await this.browser.newPage();
                await page.goto(router.href);

                let isFirstPage = routerList[0] === router;
                // 去除无需打印内容
                await page.evaluate(isFirstPage => {
                    // 调整第一页的目录位置
                    if (isFirstPage) {
                        document.body.appendChild(document.querySelector('#sidebar'));
                        document.querySelector('.searchBox').style = 'display:none';
                        document.querySelector('#content').style = 'padding-bottom: 0';
                    }

                    Array.from(document.querySelectorAll('body > div')).forEach(item => {
                        if (item.id === 'content' || (isFirstPage && item.id === 'sidebar')) return;
                        if (item.style) item.style = 'display:none';
                    });

                    let commentDom = document.querySelector('#留言');
                    if (commentDom.style) commentDom.style = 'display:none';
                }, isFirstPage);

                await page.pdf({
                    format: 'A4',
                    printBackground: true,
                    path: `src/data/ES6-pdf/${router.name}.pdf`,
                });
                await page.close();
            }
        } catch(err) {
            console.error('formatPDFContentFn error', err);
        }
    }

    /**
     * 合并pdf文件
     * @param {Array} pdfList - 待合并PDF文件列表
     */
    async mergePDfFn(pdfList = []) {
        try {
            const files = pdfList.map(item => {
                  return `src/data/ES6-pdf/${item.name}.pdf`;
            });

            await PDFMerge(files, { output: 'src/data/ES6.pdf' });
        } catch(err) {
            console.error('concatPDfFn error', err);
        }
    }
}

export default CreateSpider;