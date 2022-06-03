const webAudio = document.querySelectorAll('audio')



// if (webAudio) {
//     console.log('hallo audio element')
//     console.log(webAudio)
// }

if ('Notification' in window) {
    if (Notification.permission === "granted") {
        // doNotify()
    } else {
        Notification.requestPermission()
            .then(function (result) {
                console.log(result);

            })
            .catch((err) => {
                console.log(err)
            })

    }
}


function doNotify() {
    let title = "The Title"
    let option = {
        body: "hello from JavaScript!",
        image: "./images/logoxs.png"
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