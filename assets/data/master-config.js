/* Public configuration only. No credentials, private content or access flags here.
   Leave empty until the authenticated API described in MASTER-API.md is deployed. */
const valedriaLocalMaster=/^(127\.0\.0\.1|localhost)$/i.test(location.hostname);
window.VALEDRIA_MASTER_CONFIG = Object.freeze({ apiBase: valedriaLocalMaster ? '/api' : '' });
