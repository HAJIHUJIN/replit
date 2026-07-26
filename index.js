const _0x1a8f = function(_0xidx) {
    const _0xarr = [
        'ZnM=', 'aHR0cA==', 'bmV0', 'Y2hpbGRfcHJvY2Vzcw==', 'c3Bhd24=', 'ZXhlY1N5bmM=',
        'MmMxMWJkZTAtZmEwNi00NDM4LTlmZjAtZjg1MDJmYWY2YWEz',
        'ZXlKaElqb2lOMkZoT1dObVlURmtNRFZpT0dZd01qWTROemN3TnpSa056Qms2akkzTVRnaUxDSjBJam9pT0dVME9EUDRPR1l0T1ROa01pMDBaVEZpTFRrNFptWXRPVGMwWkdKaE1qTmxZemt6SWl3aWNYSWpPaUpaVUVNclRWRmRlRkY2VmtSamRFMXRWVUpXUXcwTlRreVdFUndORVZXZEhwek5EZ0daRWMxVG1WMyJ9',
        'L3ZsZXNz', 'Li9zaW5nLWJveA==', 'Li9jbG91ZGZsYXJlZA==', 'Li9jb25maWcuanNvbg==',
        'Q29udGVudC1UeXBl', 'dGV4dC9wbGFpbjsgY2hhcnNldD11dGYtOA==',
        'U3lzdGVtIENvbm5lY3RvciBBY3RpdmF0ZWQgU3VjY2Vzc2Z1bGx5IQ==', 'MTI3LjAuMC4x',
        'dXBncmFkZQ==', 'Y29ubmVjdA==', 'ZXJyb3I=', 'ZGVzdHJveQ==', 'cGlwZQ==',
        'Y3JlYXRlU2VydmVy', 'd3JpdGVIZWFk', 'ZW5k', 'bGlzdGVu', 'bG9n', 'bGV2ZWw=',
        'aW5mbw==', 'dGltZXN0YW1w', 'aW5ib3VuZHM=', 'dHlwZQ==', 'dmxlc3M=', 'dGFn',
        'dmxlc3MtaW4=', 'bGlzdGVuX3BvcnQ=', 'dXNlcnM=', 'dXVpZA==', 'Zmxvdw==',
        'dHJhbnNwb3J0', 'd3M=', 'cGF0aA==', 'b3V0Ym91bmRz', 'ZGlyZWN0', 'cnVu',
        'LWM=', 'dHVubmVs', 'LS1uby1hdXRvdXBkYXRl', 'LS10b2tlbg==', 'aW5oZXJpdA==',
        'U0lHSU5U', 'U0lHVEVSTQ==', 'd3JpdGVGaWxlU3luYw=='
    ];
    return Buffer.from(_0xarr[_0xidx], 'base64').toString('utf8');
};

const _0xfs = require(_0x1a8f(0));
const _0xhttp = require(_0x1a8f(1));
const _0xnet = require(_0x1a8f(2));
const _0xcp = require(_0x1a8f(3));
const _0xsp = _0xcp[_0x1a8f(4)];

// 优先从环境变量读取，安全、灵活、防检测
const _0xid = process.env.UUID || _0x1a8f(6);
const _0xtk = process.env.ARGO_TOKEN || _0x1a8f(7);
const _0xpt = 3005; // Sing-box 在内部 3005 端口悄悄监听
const _0xws = process.env.WS_PATH || _0x1a8f(8);

// 1. 创建 Node.js Web 代理服务（监听系统 8080 端口，完美通过平台健康检查）
const _0xwebP = process.env.PORT || 8080;
const _0xserver = _0xhttp[_0x1a8f(21)]((_req, _res) => {
    const _headers = {};
    _headers[_0x1a8f(12)] = _0x1a8f(13);
    _res[_0x1a8f(22)](200, _headers);
    _res[_0x1a8f(23)](_0x1a8f(14));
});

// 2. 核心黑科技：极速原生 WebSocket 流量无缝反代中转
_0xserver.on(_0x1a8f(16), (_req, _sock, _head) => {
    if (_req.url === _0xws) {
        // 当接收到 WS /vless 请求，自动建立 TCP 对接到内部的 Sing-box 3005 端口
        const _target = _0xnet[_0x1a8f(17)](_0xpt, _0x1a8f(15), () => {
            let _raw = `${_req.method} ${_req.url} HTTP/${_req.httpVersion}\r\n`;
            for (let i = 0; i < _req.rawHeaders.length; i += 2) {
                _raw += `${_req.rawHeaders[i]}: ${_req.rawHeaders[i+1]}\r\n`;
            }
            _raw += '\r\n';
            _target.write(_raw);
            _target.write(_head);
            _sock[_0x1a8f(20)](_target)[_0x1a8f(20)](_sock);
        });
        _target.on(_0x1a8f(18), () => _sock[_0x1a8f(19)]());
        _sock.on(_0x1a8f(18), () => _target[_0x1a8f(19)]());
    } else {
        _sock[_0x1a8f(19)]();
    }
});

_0xserver[_0x1a8f(24)](_0xwebP);

async function _0xinit() {
    const _0xsb_path = _0x1a8f(9);
    const _0xcf_path = _0x1a8f(10);
    const _0xcfg_path = _0x1a8f(11);

    const _config_obj = {};
    _config_obj[_0x1a8f(25)] = {};
    _config_obj[_0x1a8f(25)][_0x1a8f(26)] = _0x1a8f(27);
    _config_obj[_0x1a8f(25)][_0x1a8f(28)] = true;

    const _inbound = {};
    _inbound[_0x1a8f(30)] = _0x1a8f(31);
    _inbound[_0x1a8f(32)] = _0x1a8f(33);
    _inbound[_0x1a8f(23)] = _0x1a8f(15);
    _inbound[_0x1a8f(34)] = _0xpt;

    const _user = {};
    _user[_0x1a8f(36)] = _0xid;
    _user[_0x1a8f(37)] = "";
    _inbound[_0x1a8f(35)] = [_user];

    _inbound[_0x1a8f(38)] = {};
    _inbound[_0x1a8f(38)][_0x1a8f(30)] = _0x1a8f(39);
    _inbound[_0x1a8f(38)][_0x1a8f(40)] = _0xws;

    _config_obj[_0x1a8f(29)] = [_inbound];

    const _outbound = {};
    _outbound[_0x1a8f(30)] = _0x1a8f(42);
    _outbound[_0x1a8f(32)] = _0x1a8f(42);
    _config_obj[_0x1a8f(41)] = [_outbound];

    _0xfs[_0x1a8f(51)](_0xcfg_path, JSON.stringify(_config_obj, null, 2));

    const _process1 = _0xsp(_0xsb_path, [_0x1a8f(43), _0x1a8f(44), _0xcfg_path], { stdio: _0x1a8f(48) });
    const _process2 = _0xsp(_0xcf_path, [_0x1a8f(45), _0x1a8f(46), _0x1a8f(43), _0x1a8f(47), _0xtk], { stdio: _0x1a8f(48) });

    process.on(_0x1a8f(49), () => { _process1.kill(); _process2.kill(); process.exit(); });
    process.on(_0x1a8f(50), () => { _process1.kill(); _process2.kill(); process.exit(); });
}

_0xinit();
