/**
 * 公共工具类
 */
class ToolClass {
    static sleep(delay = 1000) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    resolve();
                } catch (e) {
                    reject(e);
                }
            }, delay)
        });
    }
}

export default ToolClass;