// 间接连续调用请求获取最新的结果(由于使用场景的限制不适合使用Promise.all等)
// 1、基于序号标记，只处理最新的请求
let latestRequestId = 0; // 初始化最新请求序号

// 模拟异步请求的函数
function mockApiRequest(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Response for request: ${data}`);
        }, Math.random() * 1000); // 随机延迟，模拟网络请求
    });
}
// 序号标记请求数据
async function serialNumberMarkFetchData(requestData) {
    const requestId = ++latestRequestId; // 生成新的请求序号
    console.log(`Sending request with ID: ${requestId} and data: ${requestData}`);

    try {
        const response = await mockApiRequest(requestData);

        // 仅当响应的序号是最新序号时处理数据
        if (requestId === latestRequestId) {
            console.log(`Processing response: ${response}`);
            // 在这里处理数据或更新状态
        } else {
            console.log(`Old request ignored: ${requestId}`);
        }
    } catch (error) {
        console.error('Request failed:', error);
    }
}

// 模拟快速连续调用的情况
serialNumberMarkFetchData('Request 1'); // 发送第一个请求
setTimeout(() => serialNumberMarkFetchData('Request 2'), 100); // 发送第二个请求（更快）
setTimeout(() => serialNumberMarkFetchData('Request 3'), 200); // 发送第三个请求（更快）
setTimeout(() => serialNumberMarkFetchData('Request 4'), 300); // 发送第四个请求（更快）

// 2、使用AbortController 取消之前的请求
const pendingForms = new WeakMap();

async function fetchData(event) {
    const form = event.currentTarget;
    const previousController = pendingForms.get(form);

    if (previousController) {
        previousController.abort();
    }

    const controller = new AbortController();
    pendingForms.set(form, controller);

    try {
        const response = await mockApiRequest(requestData);
    } catch (error) {

    }
    fetch('/foo/bar', {
        method: 'post',
        body: JSON.stringify({test: 1234}),
        signal: controller.signal,
    }).then(() => {
        pendingForms.delete(form);
    }).catch(error => {
        // If the request was aborted, do nothing
        if (error.name === 'AbortError') return;
        // Otherwise, handle the error here or throw it back to the console
        throw error
    });
}

