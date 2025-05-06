function parseVLESS(link) {
  const url = new URL(link);
  const params = url.searchParams;
  const config = {
    name: decodeURIComponent(url.hash.slice(1)),
    type: 'vless',
    server: url.hostname,
    port: parseInt(url.port),
    uuid: url.username,
    network: params.get('type') || 'tcp',
    tls: params.get('security') === 'reality',
    'client-fingerprint': params.get('fp') || 'chrome',
    udp: params.get('udp') === 'true',
    'reality-opts': {
      'public-key': params.get('pbk'),
      'short-id': params.get('sid')
    }
  };
  // Map host to servername for REALITY
  if (params.get('host')) {
    config.servername = params.get('host');
  }
  return config;
}

module.exports.parse = async (raw) => {
  const links = raw.trim().split('\n');
  const proxies = links.map(link => parseVLESS(link)).filter(Boolean);
  return { proxies };
};
