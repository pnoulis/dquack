const touch = function checkAllContainerizedServiceDependenciesExist(ID) {
    return {
        route: `get:service/${ID}`
    }
}

export default touch;