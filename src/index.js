import jsdom from "jsdom";
const JSDOM = jsdom.JSDOM;

const main = async () => {
    const doc = await JSDOM.fromURL("https://secure.byond.com/games/Exadv1/SpaceStation13")
    const entries = doc.window.document.getElementsByClassName("live_game_status")

    const results = []

    for(let entry of entries) {
        entry.removeChild(entry.getElementsByClassName("smaller")[0])
        const copyText = entry.textContent.trim()

        if(copyText !== "") {
            const matches = entry.textContent.match(/(?<=Logged in: )\d*/g)
            let loggedIn = 0
            if(matches !== null) {
                loggedIn = parseInt(matches[0])
            }
            const body = entry.textContent.replace(/Logged in: [\s\S]*/g, "").replace(/No players.[\s\S]*/g, "").trim()
            results.push({ text: body.split("\n"), players: loggedIn })
        }
    }

    console.log(results)
}

main().catch(error => console.error(error))