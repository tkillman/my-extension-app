console.log('background');

let popupId: number | undefined;

const createWindow = async () => {
    const window = await chrome.windows.create({
        type: 'popup',
        url: chrome.runtime.getURL('popup.html'),
    });

    popupId = window.id;
};

const focusWindow = async (paramPopupId: number) => {
    await chrome.windows.update(popupId, {
        focused: true,
    });
};

chrome.action.onClicked.addListener(async () => {
    console.log('chrome.action.onClicked');
    if (popupId) {
        await focusWindow(popupId);
    } else {
        await createWindow();
    }
});

chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener(async (msg) => {
        console.log('post send : ', msg, chrome);

        const result = await chrome.storage.sync.get('loginId');
        console.log('result', result);

        if (result && result.loginId) {
            console.log('store status');
            port.postMessage('store status');
        } else {
            console.log('logout status');
            port.postMessage('logout status');
        }
    });
});
