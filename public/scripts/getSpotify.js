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
							let audiosection = `<section class="audio-box">
													<section class="controls">
														<section class="tijdbalk">
															<input class="time" type="range" value="0" min="0" max="100">
														</section>
														<section class="buttons">
															<svg class="pauze hide" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64.15 77.69">
																<rect width="28.16" height="77.69" rx="1.75" />
																<rect x="36" width="28.16" height="77.69" rx="1.75" />
															</svg>
															<svg class="play" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67.6 77.74">
																<path d="M73.48,38,8,.13A1,1,0,0,0,6.39,1V76.69a1,1,0,0,0,1.56.9L73.48,39.76A1,1,0,0,0,73.48,38Z"
																	transform="translate(-6.39 0.01)" />
															</svg>
														</section>
														<section class="volume">
															<svg class="mute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 572.5 574.7">
																<path class="small"
																	d="M-408.78,2321.44c0-57-31.87-106.81-78.12-131.06v58.91c15.54,19.12,25,44.41,25,72.15s-9.47,53-25,72.15v58.91C-440.65,2430.22-408.78,2379.44-408.78,2321.44Z"
																	transform="translate(840.65 -2034.09)" />
																<polygon points="0 193.6 0 381.1 125 381.1 281.25 537.35 281.25 37.35 125 193.6 0 193.6" />
																<path class="big"
																	d="M-486.9,2034.09v67.5c90.31,28.18,156.25,116,156.25,219.85s-65.94,191.68-156.25,219.86v67.49c125.31-29.81,218.75-147.11,218.75-287.35S-361.59,2063.91-486.9,2034.09Z"
																	transform="translate(840.65 -2034.09)" />
																<polygon class="gedempt" points="46.79 0 0.26 46.72 523.15 574.7 572.5 524.2 46.79 0" />
															</svg>
															<input class="volume" type="range" min="0" max="100">
															<p class="getal">0.5</p>
														</section>
														<section class="timer">
															<p class="tijdmoment">0:00/0:00</p>
														</section>
													</section>
												</section>`;

							let audiocontrol = `<audio controls>
                                      <source src="${previewUrl}" type="audio/ogg">
                                  </audio>
                              </section>`;
							html += audiosection;
						}
						section.innerHTML = html;

						const audio = new Audio(track.preview_url)

						var btn = document.querySelector(".buttons");
						var pauze = document.querySelector(".pauze");
						var play = document.querySelector(".play");
						var audiobox = document.querySelector(".audio-box");

						var volumeSlide = document.querySelector("input.volume");
						var mute = document.querySelector(".mute");
						var getal = document.querySelector(".getal");
						var groot = document.querySelector(".big");
						var svgMute = document.querySelector(".mute");

						var tijdMomi = document.querySelector(".tijdmoment");

						// Video geladen -> tijd van de video updaten
						audio.onloadedmetadata = function () {
							tijdMomi.textContent = myTime(audio.currentTime) + "/" + myTime(audio.duration);
						};

						////////////////////////////////
						// Volume van de video aanpassen
						volumeSlide.addEventListener('input', volumeChange)

						function volumeChange() {
							var volumeGetal = volumeSlide.value;
							var volumeDec = volumeGetal / 100;
							audio.volume = volumeDec;
							const toggleTypeBig = (volumeDec >= 0.01 && volumeDec <= 0.5) ? 'add' : 'remove';
							groot.classList[toggleTypeBig]('hide');
							const toggleMute = (volumeDec == 0) ? 'add' : 'remove';
							svgMute.classList[toggleMute]('stil');
						}

						////////////////
						// Volume dempen
						mute.addEventListener('click', volumeMute);

						function volumeMute() {
							var geluid = volumeSlide.value;
							var volumeBack = geluid / 100;
							if (audio.volume >= 0.01) {
								getal.textContent = volumeBack;
								var volumeGetal = 0;
								audio.volume = volumeGetal;
								volumeSlide.value = volumeGetal;
								svgMute.classList.add('stil');

							} else if (volumeSlide.value == 0) {
								var volumeOld = getal.innerHTML
								audio.volume = volumeOld;
								var value = volumeOld * 100;
								volumeSlide.value = value;
								svgMute.classList.remove('stil');
							}
						}

						// Tijd updaten op de balk
						var tijd = document.querySelector("input.time");

						audio.addEventListener('timeupdate', function () {
							var juicePos = audio.currentTime / audio.duration;
							var schaal = juicePos * 100;
							tijd.value = schaal;
						})

						// Tijd veranderen op de balk
						tijd.addEventListener('input', scrub);

						function scrub() {
							audio.pause();
							var minuut = tijd.value;
							var delingMin = minuut / 100;
							var deling = audio.duration * delingMin;
							audio.currentTime = deling;
							play.classList.remove("hide")
							pauze.classList.add("hide")
							timer = setInterval(update, 100);
						}

						// Tijd veranderd via de balk
						tijd.addEventListener('mouseup', noklik);

						function noklik() {
							speelAf();
						}

						// Tijd update
						function update() {
							tijdMomi.textContent = myTime(audio.currentTime) + "/" + myTime(audio.duration);
						}

						// Functie van seconde naar minuut
						function myTime(time) {
							var uur = ~~(time / 3600);
							var min = ~~((time / 3600) / 60);
							var sec = time % 60;
							var secMin = "";
							if (uur > 0) {
								secMin += "" + uur + ":" + (min < 10 ? "0" : "");
							}
							secMin += "" + min + ":" + (sec < 9.5 ? "0" : "");
							secMin += "" + Math.round(sec);
							return secMin;
						}

						// Check of de video afspleelt
						audio.addEventListener('timeupdate', videomotion);

						function videomotion() {
							if (audio.ended) {
								pauze.classList.add('hide');
								play.classList.remove('hide');
								clearInterval(timer)
								audiobox.classList.remove('playing');
							} else if (audio.paused) {
								audiobox.classList.remove('playing');
								audiobox.classList.remove('hover');
							} else if (audio.play) {
								audiobox.classList.add('playing');
							}
						};

						audio.addEventListener('click', speelAf);
						btn.addEventListener('click', speelAf);


						function speelAf() {
							// Check of video afspeelt.
							const manier = audio.paused ? 'play' : 'pause';
							// Speel af of pauzeer video.
							audio[manier]();
							if (manier == 'play') {
								play.classList.add("hide")
								pauze.classList.remove("hide")

								timer = setInterval(update, 100);
							} else {
								play.classList.remove("hide")
								pauze.classList.add("hide")

								clearInterval(timer);
							}
						}

						document.addEventListener("keydown", keycheck);

						function keycheck(e) {
							// console.log(e)
							if (e.keyCode === 32) {
								speelAf();
								e.preventDefault();
							}
						};

						// Functie notificatie

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