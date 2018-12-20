#!/usr/bin/env node
import program from 'commander';
import BaseClass from '../base/index';

class CommandLine extends BaseClass {
    constructor(props) {
        super(props);
        this.actionList.push(this.handleByCommandFn);
    }

    /**
     * 根据用户输入选择打印还是截图
     */
    async handleByCommandFn() {
        try {
            const page = await this.browser.newPage();
            program.option('-p, --url', 'Add Web Site which you want?')
              .option('-p, --type', 'pdf or png ?')
              .parse(process.argv);

            if (program.url) {
                await page.goto(program.url);
            }
            if (program.type === 'pdf') {
                await page.pdf({ path: 'src/data/commnder.pdf', format: 'A4' });
            } else {
                await page.screenshot({ path: 'src/data/commnder.pngt', fullPage: true });
            }
        } catch (err) {
            console.error('handleByCommandFn error', err);
        }
    }
}

export default CommandLine;