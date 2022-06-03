const clientId = "97827c6f27404e7a8ce75a072081a151";
const clientSecret = "9d4531501fd94595a45632324e3387b5";

async function getCategory() {
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
	const eind = await fetch(
		"https://api.spotify.com/v1/browse/categories?country=NL", {
			method: "GET",
			headers: {
				Authorization: "Bearer " + token,
			},
		}
	);
	// console.log(token);
	const data = await eind.json();
	const categories = data.categories.items;

	// Renderfunction shamellysly copy pasted van het internet
	let html = "";
	let liCat = document.querySelectorAll("li.werkCat");

	let checkCat = [];

	liCat.forEach(li => {
		console.log(li.innerText);
		const catId = li.innerText;
		checkCat.push(catId);
	});


	categories.forEach((categorie) => {
		const methode = checkCat.includes(categorie.id);
		if (methode) {
			console.log(categorie.id);
			let htmlSegment = `<div class="container">
                                    <label for="${categorie.id}">
                                        <p>${categorie.name}</p>
                                        <img src="${categorie.icons[0].url}"/>
                                    </label>
                                    <input type="checkbox" name="categorie" value="${categorie.id}" id="${categorie.name}" checked>
                                </div>`;
			html += htmlSegment;
		} else {
			console.log(categorie.id);
			let htmlSegment = `<div class="container">
                                    <label for="${categorie.id}">
                                        <p>${categorie.name}</p>
                                        <img src="${categorie.icons[0].url}"/>
                                    </label>
                                    <input type="checkbox" name="categorie" value="${categorie.id}" id="${categorie.name}">
                                </div>`;
			html += htmlSegment;
		}
	});
	let buttonToEnd = "<button>Opslaan</button>";
	html += buttonToEnd;
	let form = document.querySelector("form.categorie");
	form.innerHTML = html;
}

const maincat = document.querySelector("main.start");

if (maincat) {
	getCategory();
}

const mainLijst = document.querySelector("main.muziekLijst");

if (mainLijst) {
	let tracks = [];
	let muziek = [];

	async function getTracks() {
		// GetTOKEN
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

		let listItems = document.querySelectorAll("li.categorie");

		async function getPlaylist(catID) {
			const res = await fetch(
				`https://api.spotify.com/v1/browse/categories/${catID}/playlists?limit=5`, {
					method: "GET",
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			);
			const eind = await res.json();
			return eind;
		}

		const playListCategories = [];

		listItems.forEach((categorie) => {
			const catID = categorie.innerText;
			playListCategories.push(getPlaylist(catID));
		});

		Promise.all(playListCategories).then((data) => {
			// console.log(data);
			data.forEach((link) => {
				if (link.playlists == undefined) {
					// console.log('skip')
					return;
				} else {
					const afspeellijst = link.playlists.items;
					afspeellijst.forEach((lijst) => {
						if (lijst == null) {
							return;
						} else {
							const tracksEndPoint = lijst.tracks.href;
							tracks.push(getMuziek(tracksEndPoint));
						}
					});
				}
			});

			async function getMuziek(tracksEndPoint) {
				const res = await fetch(`${tracksEndPoint}`, {
					method: "GET",
					headers: {
						Authorization: "Bearer " + token,
					},
				});
				const eind = await res.json();
				const trackArray = eind.items;
				return trackArray;
			}

			Promise.all(tracks).then((data) => {
				data.forEach((array) => {
					array.forEach((tracky) => {
						const track = tracky.track;
						if (track == null) {
							return
						} else {
							if (track.preview_url == null) {
								return
							} else {
								muziek.push(track);
							}
						}


					});
				});

				function CreateOne() {
					let liLike = document.querySelectorAll("li.like");
					let liDislike = document.querySelectorAll("li.dislike");
					const trackId = muziek[0].id;
					let checklist = [];

					liLike.forEach((li) => {
						const likeId = li.innerText;
						checklist.push(likeId);
					});

					liDislike.forEach((li) => {
						const dislikeId = li.innerText;
						checklist.push(dislikeId);
					});

					const newSet = new Set(checklist);
					const checkArray = Array.from(newSet);

					function ShowOne() {
						const meth = checkArray.includes(trackId);
						if (meth == true) {
							const value = muziek[0];
							muziek = muziek.filter(function (item) {
								return item != value;
							});

							CheckTwo(muziek);
						} else if (meth == false) {
							showTrack(muziek);
						}
					}

					ShowOne();

					function CheckTwo(muziek) {
						const newTrackId = muziek[0].id;
						const meth2 = checkArray.includes(newTrackId);
						if (meth2 == true) {
							const value = muziek[0];
							muziek = muziek.filter(function (item) {
								return item != value;
							});
							CheckTwo(muziek);
						} else if (meth2 == false) {
							showTrack(muziek);
						}
					}

					function showTrack(muziek) {
						const track = muziek[0];

						const previewUrl = track.preview_url;
						const artist = track.artists;
						const section = document.querySelector("section.figure");

						let html = "";
						// Artiest foreach loopje!!!
						let htmlSegment = `<section>
                                                    <section>
                                                      <h2>${track.name}</h2>`;
						html += htmlSegment;

						if (artist.length == 1) {
							let ArtistSection = `<h3>${artist[0].name}</h3>`;
							html += ArtistSection;
						} else if (artist.length == 2) {
							let ArtistSection = `<h3>${artist[0].name} & ${artist[1].name}</h3>`;
							html += ArtistSection;
						} else if (artist.length == 3) {
							let ArtistSection = `<h3>${artist[0].name}, ${artist[1].name} & ${artist[2].name}</h3>`;
							html += ArtistSection;
						} else if (artist.length >= 4) {
							let ArtistSection = `<h3>${artist[0].name}, ${artist[1].name}, ${artist[2].name} & ${artist[3].name}</h3>`;
							html += ArtistSection;
						}
						let moreSegment = `<form action="/ontdek" method="post">
                                  <input type="hidden" name="trackId" value="${track.id}">
                                  <input class="submit like" type="submit" name="like" value="Like" placeholder="Like">
                                  <input class="submit dislike" type="submit" name="dislike" value="Dislike" placeholder="Dislike">
                              </form>
                          </section>
                          <section>
                              <img src="${track.album.images[0].url}" alt="">
                          </section>
                      </section>
                      <section>`;
						html += moreSegment;
						if (previewUrl == null) {
							let audioErr = `<h3>Geen preview beschikbaar</h3>
                                            </section>
                                            </section>`;
							html += audioErr;
						} else {
							let audiocontrol = `<audio controls>
                                      <source src="${previewUrl}" type="audio/ogg">
                                  </audio>
                              </section>`;
							html += audiocontrol;
						}
						section.innerHTML = html;

						// 
						// 
						// Functie notificatie
						// 
						//

						function checkNotificationOn() {
							if ('Notification' in window) {
								if (Notification.permission === "granted") {
									// notify()
									makeListener()
								} else {
									Notification.requestPermission()
										.then(function (result) {
											if (result === "granted") {
												makeListener()
											}
										})
										.catch((err) => {
											console.log(err)
										})
								}
							}
						}

						checkNotificationOn()

						function makeListener() {
							const submitLike = document.querySelector('input.submit.like');
							submitLike.addEventListener('click', showNotification);
							const submitDislike = document.querySelector('input.submit.dislike');
							submitDislike.addEventListener('click', showNotification);
						}


						function showNotification(e) {
							let method = "";
							if (e.target.value == "Like") {
								method = "likes"
							} else if (e.target.value == "Dislike") {
								method = "dislikes"
							}
							console.log(track)
							let title = `Nummer toegevoegd aan ${method}`
							let option = {
								body: `${track.name} van ${track.artists[0].name}`,
								icon: `${track.album.images[2].url}`
							}
							let n = new Notification(title, option);

							n.addEventListener('show', function (ev) {
								console.log('SHOW', ev.currentTarget.data)
								console.log(ev)
							})

							n.addEventListener('close', function (ev) {
								console.log('CLOSE', ev.currentTarget.data)
							})

							setTimeout(n.close.bind(n), 5000)
						}
					}
				}
				CreateOne();
			});
		});
	}
	getTracks();
}

const mainLikes = document.querySelector("main.likes");

let likes = [];

if (mainLikes) {
	const likeId = document.querySelectorAll("li.likeId");

	async function getLikeList() {
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

		likeId.forEach((id) => {
			const nummerId = id.innerText;
			likes.push(LikeList(nummerId));
		});

		async function LikeList(nummerId) {
			const res = await fetch(`https://api.spotify.com/v1/tracks/${nummerId}`, {
				method: "GET",
				headers: {
					Authorization: "Bearer " + token,
				},
			});
			const eind = await res.json();
			return eind;
		}

		let html = "";
		const likeSection = document.querySelector("section.likes");

		Promise.all(likes).then((data) => {
			data.forEach((track) => {
				const previewUrl = track.preview_url;
				const artist = track.artists;
				let htmlSegment = `<section class="likeSection">
                                        <section>
                                            <section>
                                                <h2>${track.name}</h2>`;
				html += htmlSegment;
				if (artist.length == 1) {
					let ArtistSection = `<h3>${artist[0].name}</h3>`;
					html += ArtistSection;
				} else if (artist.length == 2) {
					let ArtistSection = `<h3>${artist[0].name} & ${artist[1].name}</h3>`;
					html += ArtistSection;
				} else if (artist.length == 3) {
					let ArtistSection = `<h3>${artist[0].name}, ${artist[1].name} & ${artist[2].name}</h3>`;
					html += ArtistSection;
				} else if (artist.length >= 4) {
					let ArtistSection = `<h3>${artist[0].name}, ${artist[1].name}, ${artist[2].name} & ${artist[3].name}</h3>`;
					html += ArtistSection;
				}
				let moreSegment = `<form action="/likes" method="post">
                                                    <input type="hidden" name="trackId" value="${track.id}">
                                                    <input class="delete" type="submit" name="delete" value="delete">
                                                </form>
                                            </section>
                                            <section>
                                                <img src="${track.album.images[0].url}" alt="">
                                            </section>
                                        </section>
                                        <section>`;
				html += moreSegment;
				if (previewUrl == null) {
					let audioErr = `<h3>Geen preview beschikbaar</h3>
                                    </section>
                                </section>`;
					html += audioErr;
				} else {
					let audiocontrol = `<audio controls>
                                                <source src="${track.preview_url}" type="audio/ogg">
                                            </audio>
                                        </section>
                                    </section>`;
					html += audiocontrol;
				}
				likeSection.innerHTML = html;

				function checkNotificationOn() {
					if ('Notification' in window) {
						if (Notification.permission === "granted") {
							makeListener()
						} else {
							Notification.requestPermission()
								.then(function (result) {
									if (result === "granted") {
										makeListener()
									}
								})
								.catch((err) => {
									console.log(err)
								})
						}
					}
				}

				checkNotificationOn()

				function makeListener() {
					const inputDel = document.querySelectorAll('input.delete');
					inputDel.forEach(input => {
						input.addEventListener('click', showNotification)
					})
				}


				function showNotification(e) {
					const titel = e.path[2].children[0].innerText;
					const artiest = e.path[2].children[1].innerText;
					const image = e.path[3].children[1].children[0].currentSrc;
					let title = `Nummer verwijderd uit likes`
					let option = {
						body: `${titel} van ${artiest}`,
						icon: `${image}`
					}
					let n = new Notification(title, option);

					setTimeout(n.close.bind(n), 5000)
				}
			});
		});
	}
	getLikeList();
}


const mainDisikes = document.querySelector("main.dislikes");

let dislikes = [];

if (mainDisikes) {
	const dislikeId = document.querySelectorAll("li.dislikeId");

	async function getDislikeList() {
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

		dislikeId.forEach((id) => {
			const nummerId = id.innerText;
			console.log(nummerId);
			dislikes.push(DislikeList(nummerId));
		});

		async function DislikeList(nummerId) {
			const res = await fetch(`https://api.spotify.com/v1/tracks/${nummerId}`, {
				method: "GET",
				headers: {
					Authorization: "Bearer " + token,
				},
			});
			const eind = await res.json();
			return eind;
		}

		let html = "";
		const dislikeSection = document.querySelector("section.dislikes");

		Promise.all(dislikes).then((data) => {
			data.forEach((track) => {
				console.log(track);
				const previewUrl = track.preview_url;
				const artist = track.artists;
				let htmlSegment = `<section class="dislikeSection">
                                        <section>
                                            <section>
                                                <h2>${track.name}</h2>`;
				html += htmlSegment;
				if (artist.length == 1) {
					let ArtistSection = `<h3>${artist[0].name}</h3>`;
					html += ArtistSection;
				} else if (artist.length == 2) {
					let ArtistSection = `<h3>${artist[0].name} & ${artist[1].name}</h3>`;
					html += ArtistSection;
				} else if (artist.length == 3) {
					let ArtistSection = `<h3>${artist[0].name}, ${artist[1].name} & ${artist[2].name}</h3>`;
					html += ArtistSection;
				} else if (artist.length >= 4) {
					let ArtistSection = `<h3>${artist[0].name}, ${artist[1].name}, ${artist[2].name} & ${artist[3].name}</h3>`;
					html += ArtistSection;
				}
				let moreSegment = `<form action="/dislikes" method="post">
                                                    <input type="hidden" name="trackId" value="${track.id}">
                                                    <input class="delete" type="submit" name="delete" value="delete">
                                                </form>
                                            </section>
                                            <section>
                                                <img src="${track.album.images[0].url}" alt="">
                                            </section>
                                        </section>
                                        <section>`;
				html += moreSegment;
				if (previewUrl == null) {
					let audioErr = `<h3>Geen preview beschikbaar</h3>
                                    </section>
                                </section>`;
					html += audioErr;
				} else {
					let audiocontrol = `<audio controls>
                                                <source src="${track.preview_url}" type="audio/ogg">
                                            </audio>
                                        </section>
                                    </section>`;
					html += audiocontrol;
				}
				dislikeSection.innerHTML = html;

				function checkNotificationOn() {
					if ('Notification' in window) {
						if (Notification.permission === "granted") {
							makeListener()
						} else {
							Notification.requestPermission()
								.then(function (result) {
									if (result === "granted") {
										makeListener()
									}
								})
								.catch((err) => {
									console.log(err)
								})
						}
					}
				}

				checkNotificationOn()

				function makeListener() {
					const inputDel = document.querySelectorAll('input.delete');
					inputDel.forEach(input => {
						input.addEventListener('click', showNotification)
					})
				}


				function showNotification(e) {
					const titel = e.path[2].children[0].innerText;
					const artiest = e.path[2].children[1].innerText;
					const image = e.path[3].children[1].children[0].currentSrc;
					let title = `Nummer verwijderd uit dislikes`
					let option = {
						body: `${titel} van ${artiest}`,
						icon: `${image}`
					}
					let n = new Notification(title, option);

					setTimeout(n.close.bind(n), 5000)
				}
			});

		});
	}
	getDislikeList();
}

function jsON() {
	const section = document.querySelector("section.noJs");
	const likeSect = document.querySelector("section.noJSlikes");
	if (section) {
		section.remove();
	}
	if (likeSect) {
		likeSect.remove();
	}
}

jsON();


// function eventListeners(track, submitLike, submitDislike) {

// 	console.log(track)
// 	console.log(submitLike)
// 	console.log(submitDislike)
// 	const liked = () => {
// 		return submitLike
// 	}

// 	const disliked = () => {
// 		return submitDislike
// 	}
// }

// function showNoti(track) {
// 	console.log(track)
// 	if ('Notification' in window) {
// 		if (Notification.permission === "granted") {
// 			// doNotify(track)
// 		} else {
// 			Notification.requestPermission()
// 				.then(function (result) {
// 					console.log(result);

// 				})
// 				.catch((err) => {
// 					console.log(err)
// 				})

// 		}
// 	}
// }




// function doNotify() {
// 	console.log(track)
// 	let title = "The Title"
// 	let option = {
// 		body: "hello from JavaScript!",
// 		image: "./images/logoxs.png"
// 	}
// 	let n = new Notification(title, option);

// 	n.addEventListener('show', function (ev) {
// 		console.log('SHOW', ev.currentTarget.data)
// 		console.log(ev)
// 	})

// 	n.addEventListener('close', function (ev) {
// 		console.log('CLOSE', ev.currentTarget.data)
// 	})

// 	setTimeout(n.close.bind(n), 5000)
// }