import command from 'inquirer';
import BaseClass from '../base/index';
// default command prompt
const questions = [{
        type: 'input',
        name: 'webURI',
        default: () => { return 'https://music.163.com' },
        message: 'Please add Web Site what you want?'
    }, {
        type: 'input',
        name: 'type',
        default: () => { return 'pdf' },
        message: 'pdf or screen shot?'
    }];

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
            const answers = await command.prompt(questions);

            if (answers.webURI) {
                await page.goto(answers.webURI);
            }
            if (answers.type === 'pdf') {
                await page.pdf({ path: 'src/data/commander.pdf', format: 'A4' });
            } else {
                await page.screenshot({ path: 'src/data/commander.pngt', fullPage: true });
            }
        } catch (err) {
            console.error('handleByCommandFn error', err);
        }
    }
}

export default CommandLine;