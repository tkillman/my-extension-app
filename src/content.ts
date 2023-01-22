console.log('content.ts', chrome.runtime.id, chrome);

const port = chrome.runtime.connect({});

let timer: any;

const startTimer = () => {
    timer = setInterval(() => {
        console.log('give me data');
        port.postMessage('give me data');
    }, 2000);
};

startTimer();

port.onMessage.addListener((msg) => {
    console.log('msg', msg, timer);
    if (msg === 'logout status' && timer) {
        clearInterval(timer);
    }
});

chrome.storage.onChanged.addListener((changes, area) => {
    console.log('storage onChanged', changes);
    if (changes.loginId && changes.loginId.newValue && area === 'sync') {
        startTimer();
    } else if (timer) {
        clearInterval(timer);
    }
});
