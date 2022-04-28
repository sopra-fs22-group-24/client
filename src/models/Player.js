class Player {
    constructor(data = {}) {
        this.username = null;
        this.nCards = null;
        Object.assign(this, data);
    }
}
export default Player;