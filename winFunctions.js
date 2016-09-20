var winAPI= require('./winAPIHeaders')
function setWindowToTop (hwnd) {
    var winToSetOnTop = hwnd
    var foregroundHWnd = winAPI.user32.GetForegroundWindow()
    var currentThreadId = winAPI.kernel32.GetCurrentThreadId()
    var windowThreadProcessId = winAPI.user32.GetWindowThreadProcessId(foregroundHWnd, null)
    var showWindow = winAPI.user32.ShowWindow(winToSetOnTop, 9)
    var setWindowPos1 = winAPI.user32.SetWindowPos(winToSetOnTop, -1, 0, 0, 0, 0, 3)
    var setWindowPos2 = winAPI.user32.SetWindowPos(winToSetOnTop, -2, 0, 0, 0, 0, 3)
    var setForegroundWindow = winAPI.user32.SetForegroundWindow(winToSetOnTop)
    var attachThreadInput = winAPI.user32.AttachThreadInput(windowThreadProcessId, currentThreadId, 0)
    var setFocus = winAPI.user32.SetFocus(winToSetOnTop)
    var setActiveWindow = winAPI.user32.SetActiveWindow(winToSetOnTop)
}
var targetWindow
function getWindowContainingText(searchString) {
    var ref = require('ref')
    var ffi = require('ffi')
    var voidPtr = ref.refType(ref.types.void);
    var stringPtr = ref.refType(ref.types.CString);
    var retVal
    var windowProc = ffi.Callback('bool', ['long', 'int32'], function(hwnd, lParam) {
        var buf, name, ret;
        buf = new Buffer(255);
        ret = winAPI.user32.GetWindowTextA(hwnd, buf, 255);
        name = ref.readCString(buf, 0);
        if (name.indexOf(searchString) !== -1)
        {
            targetWindow = hwnd
        }
        return true
    });

    winAPI.user32.EnumWindows(windowProc, 0)
    return targetWindow
}
const shellLaunch = (cmd) => {
    var ref = require('ref');
    var ffi = require('ffi');
    var shell32 = new ffi.Library('Shell32.dll', {
        'ShellExecuteA': ['long', ['long', 'string', 'string', 'string', 'string', 'int']]
    });
    var lng = shell32.ShellExecuteA(0, "open", cmd, "", "", 1)
}
module.exports = {
    setWindowtoTop: setWindowFocus,
    getWindowContainingText: getWindowContainingText,
    shellLaunch: shellLaunch
}
