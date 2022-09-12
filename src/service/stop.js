const stop = function stopContainerizedService(ID) {
    return {
        route: `delete:service/${ID}`
    }
}

export default stop;