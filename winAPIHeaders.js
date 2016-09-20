let ref = require("ref")
let ffi = require('ffi')
var stringPtr = ref.refType(ref.types.CString);
var user32 = new ffi.Library('user32', {
    'GetTopWindow': ['long', ['long']],
    'FindWindowA': ['long', ['string', 'string']],
    'SetActiveWindow': ['long', ['long']],
    'SetForegroundWindow': ['bool', ['long']],
    'BringWindowToTop': ['bool', ['long']],
    'ShowWindow': ['bool', ['long', 'int']],
    'SwitchToThisWindow': ['void', ['long', 'bool']],
    'GetForegroundWindow': ['long', []],
    'AttachThreadInput': ['bool', ['int', 'long', 'bool']],
    'GetWindowThreadProcessId': ['int', ['long', 'int']],
    'SetWindowPos': ['bool', ['long', 'long', 'int', 'int', 'int', 'int', 'uint']],
    'EnumWindows': ['bool', [stringPtr, 'int32']],
    'GetWindowTextA' : ['long', ['long', 'string', 'long']],
    'SetFocus': ['long', ['long']]
});
var kernel32 = new ffi.Library('Kernel32.dll', {
    'GetCurrentThreadId': ['int', []]
});
var shell32 = new ffi.Library('Shell32.dll', {
    'ShellExecuteA': ['long', ['long', 'string', 'string', 'string', 'string', 'int']]
});
module.exports = {
    shell32: shell32,
    kernel32: kernel32,
    user32: user32
}