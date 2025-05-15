function operator(proxies, targetPlatform, context) {
  // 国家代码映射表：两位 -> 三位
  const countryCodeMap = {
    'HK': 'HKG',
    'JP': 'JPN',
    'US': 'USA',
    'CN': 'CHN',
    'SG': 'SGP',
    'TW': 'TWN',
    'KR': 'KOR',
    'CA': 'CAN',
    'BR': 'BRA',
    'AU': 'AUS',
    'GB': 'GBR',
    'UK': 'GBR',
    'TR': 'TUR',
    'DE': 'DEU',
    'AR': 'ARG',
    'MO': 'MAC',
    'NG': 'NGA'
  };

  return proxies.map(proxy => {
    let name = proxy.name;

    // 遍历映射表，替换匹配的两位代码
    for (const [twoLetter, threeLetter] of Object.entries(countryCodeMap)) {
      // 匹配 XX 前为截断符（^, \s, -, |, _, ., /），后为非字母或末尾
      const regex = new RegExp(
        `(^|[\\s\\-|_\\./])${twoLetter}([^a-zA-Z]|$)`,
        'i'
      );
      if (regex.test(name)) {
        name = name.replace(regex, (match, prefix, suffix) => {
          // 保持前后截断符不变
          return `${prefix}${threeLetter}${suffix}`;
        });
      }
    }

    // 更新节点名称
    proxy.name = name;

    // 可选：为 Trojan 节点启用 tfo（结合之前的 Trojan 上下文）
    if (proxy.type === 'trojan') {
      proxy.tfo = true; // 启用 TCP Fast Open
    }

    return proxy;
  });
}
