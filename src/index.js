import CreatePDF from './pdf/index';
import ShotScreen from './screen/index';
import CreateSpider from './spider/index';
import CommandLine from './command/index';

const Screen = new ShotScreen();
const Pdf = new CreatePDF({ headless: true });
const Spider = new CreateSpider({ headless: true });
const Command = new CommandLine({ headless: true });

/*Pdf.init();
Screen.init();*/
Spider.init();
//Command.init();