'use strict';

Connector.playerSelector = 'div.layoutnowonair_reload_active';

Connector.artistSelector = 'div.teasertext > h3 > a > span.manualteasertitle';

Connector.trackSelector = 'div.teasertext > h3 > h3 > span.manualteasertitle';

Connector.isPlaying = () => {
	let state = retrieveJwplayerState();
	return (typeof state === 'string') && (state.toUpperCase() === 'PLAYING');
};

function retrieveJwplayerState() {
	let scriptContent = 'if (typeof jwplayer === "function") $("body").attr("tmp_state", typeof jwplayer().getState === "function" ? jwplayer().getState() : "");\n';

	let script = document.createElement('script');
	script.id = 'tmpScript';
	script.appendChild(document.createTextNode(scriptContent));
	(document.body || document.head || document.documentElement).appendChild(script);

	let ret = $('body').attr('tmp_state');

	$('body').removeAttr('tmp_state');
	$('#tmpScript').remove();

	return ret;
}
