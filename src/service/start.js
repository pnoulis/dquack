const start = function startContainerizedService(ID) {
    return {
        route: `post:service/${ID}`
     }
}

export default start;