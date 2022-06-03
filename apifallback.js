const fetch = require("node-fetch");

const getToplist = async (trackArray) => {
	const clientId = "97827c6f27404e7a8ce75a072081a151";
	const clientSecret = "9d4531501fd94595a45632324e3387b5";

	const result = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
		},
		body: "grant_type=client_credentials",
	});
	const log = await result.json();
	const token = log.access_token;
	// console.log(token)

	const res = await fetch(
		"https://api.spotify.com/v1/browse/categories/toplists/playlists?limit=1", {
			method: "GET",
			headers: {
				Authorization: "Bearer " + token,
			},
		}
	);
	const eind = await res.json();

	const endpoint = await eind.playlists.items[0].tracks.href;

	// console.log(endpoint)
	const response = await fetch(`${endpoint}`, {
		method: "GET",
		headers: {
			Authorization: "Bearer " + token,
		},
	});
	const end = await response.json();
	const tracks = end.items;
	// const track = end.items[0].track
	const myTracks = [];

	tracks.forEach(item => {
		const track = item.track;
		const check = track.preview_url;
		if (check == null) {
			return;
		} else {
			if (track.artists.length == 1) {
				let trackFormat = {
					"id": `${track.id}`,
					"name": `${track.name}`,
					"artists": `${track.artists[0].name}`,
					"cover": `${track.album.images[0].url}`,
					"preview": `${track.preview_url}`
				};
				myTracks.push(trackFormat);
			} else if (track.artists.length == 2) {
				let trackFormat = {
					"id": `${track.id}`,
					"name": `${track.name}`,
					"artists": [`${track.artists[0].name}`, `${track.artists[1].name}`],
					"cover": `${track.album.images[0].url}`,
					"preview": `${track.preview_url}`
				};
				myTracks.push(trackFormat);
			} else if (track.artists.length == 3) {
				let trackFormat = {
					"id": `${track.id}`,
					"name": `${track.name}`,
					"artists": [`${track.artists[0].name}`, `${track.artists[1].name}`, `${track.artists[2].name}`],
					"cover": `${track.album.images[0].url}`,
					"preview": `${track.preview_url}`
				};
				myTracks.push(trackFormat);
			} else if (track.artists.length >= 4) {
				let trackFormat = {
					"id": `${track.id}`,
					"name": `${track.name}`,
					"artists": [`${track.artists[0].name}`, `${track.artists[1].name}`, `${track.artists[2].name}`, `${track.artists[3].name}`],
					"cover": `${track.album.images[0].url}`,
					"preview": `${track.preview_url}`
				};

				myTracks.push(trackFormat);



			}
		}
	});
	return myTracks;
};

exports.getToplist = getToplist;