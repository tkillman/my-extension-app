import { useEffect, useState } from 'react';

const App = () => {
    const [inputId, setInputId] = useState<string | undefined>(undefined);
    const [storageId, setStorageId] = useState<string | undefined>(undefined);
    const handleLogout = async () => {
        console.log('handleLogout click');
        await chrome.storage.sync.set({
            loginId: null,
        });
    };

    const handleLogin = async () => {
        console.log('handleLogin click');
        await chrome.storage.sync.set({ loginId: inputId });
        console.log('value : ', await chrome.storage.sync.get('loginId'));
    };

    useEffect(() => {
        chrome.storage.onChanged.addListener((changes, area) => {
            console.log('changes', changes);
            if (changes.loginId && area === 'sync') {
                setStorageId(changes.loginId.newValue);
            }
        });
    }, []);
    return (
        <div>
            <div>hi</div>

            <div>
                <div> session : {storageId}</div>
                <input type="text" value={inputId} onChange={(e) => setInputId(e.target.value)}></input>
                <button id="login" onClick={handleLogin}>
                    login
                </button>
            </div>
            <div>
                <button id="logout" onClick={handleLogout}>
                    logout
                </button>
            </div>
        </div>
    );
};

export default App;
