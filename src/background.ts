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
