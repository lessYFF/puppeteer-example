# puppeteer-examples

the examples of puppeteer includes:
pdf |
screenshot |
spider |
commandline

项目中填的坑:
1、安装puppeteer失败。需要先执行npm i puppeteer@latest --ignore-scripts,
然后手动下载和puppeteer匹配的chromium版本到本地,
最后设置await puppeteer.launch({ executablePath:'绝对地址引入chromium' });

2、spider例子爬阮一峰老师的es6入门,每章生成一个pdf再合并成pdf文件失败。
每章生成pdf文件是没有问题,用pdf-merge合并pdf的时候就有问题了,
pdf-merge包依赖pdftk工具, mac不同版本需安装不同版本pdftk,
如果MacOS >= 10.11, pdftk正确地址是https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/pdftk_server-2.02-mac_osx-10.11-setup.pkg,
其它的就是https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/pdftk_server-2.02-mac_osx-10.6-setup.pkg.

