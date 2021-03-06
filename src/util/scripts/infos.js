module.exports = function () {
    let [type, id] = location.pathname.split('/').slice(1, 3)
    let avatar = ''
    let userName

    if (netflix) {
        let { userGuid, name } = netflix.reactContext.models.userInfo.data
        avatar = netflix.falcorCache.profiles[userGuid].avatar.value[2]
        userName = name
    }

    if (type === 'browse') {
        return {
            name   : 'Browsing',
            episode: 'In the Catalogs',
            avatar,
            userName
        }
    }

    if (type === 'title') {
        let jawBone = document.querySelector('.jawBone .title')
        let episode = jawBone.querySelector('.logo')
            ? jawBone.querySelector('.logo').getAttribute('alt')
            : jawBone.querySelector('.text').innerHTML

        return {
            name: 'Checking a title:',
            episode,
            avatar,
            userName
        }
    }

    if (type === 'watch' && document.querySelector('.ellipsize-text')) {
        let name = document.querySelector('.ellipsize-text')
        let span = document.querySelector('.ellipsize-text').querySelectorAll('span')
        let { duration, currentTime, paused } = document.querySelector('.VideoContainer').getElementsByTagName('video')[0]
        
        let title = span[1] ? span[1].innerHTML : undefined
        let episode = span[0] ? span[0].innerHTML : undefined
        let interactive = false

        if (netflix.falcorCache.videos && netflix.falcorCache.videos[id] && !!netflix.falcorCache.videos[id].summary.value.interactivity) {
            duration = undefined
            interactive = true

            let text = `Interactive ${netflix.falcorCache.videos[id].summary.value.type}`
            if (episode)
                title += ' - ' + text
            else
                episode = text
        }

        name = name.querySelector('h4') ? name.querySelector('h4').innerHTML : name.innerHTML

        return { name, title, episode, duration, currentTime, paused, interactive, avatar, userName }
    }
}