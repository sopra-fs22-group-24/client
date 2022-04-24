class Card {
    constructor(data = {}) {
        this.id = null;
        this.color = null;
        this.symbol = null;
        Object.assign(this, data);
    }
}
export default Card;