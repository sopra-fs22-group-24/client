
import SockJS from "sockjs-client"
import Stomp from "stompjs"
import { getDomain } from "./getDomain"



class SocketConnection {

    constructor() {
        let url = getDomain()
        this.socket = new SockJS(`${url}/ws-connect`, {headers: { Authorization:localStorage.getItem("token") }})
        this.stompClient = Stomp.over(this.socket)
        this.isConnected = false;
        this.subscriptions = []
    }
    
    connect = async (token, lobbyId=null) => {
        console.log(token)
        this.stompClient.connect({"token":token}, (response) => {
      
            console.log("Connect: "+response)
            this.isConnected=true
            for(var i=0; i<this.subscriptions.length;i++) {
                this._subscribe(this.subscriptions[i][0], this.subscriptions[i][1])

            }
        })

    }

    _subscribe(destination, callback) {
        this.stompClient.subscribe(destination,(response) => {
            callback(JSON.parse(response.body))
        }); 
    }


    /*
    Send content to destination
    */
    send(destination, content) {
        if(!this.isConnected) {
            throw Error("Websocket not connected")
        }
        console.log(content)
        this.stompClient.send(destination, {token: localStorage.getItem("token")}, JSON.stringify(content));
    }

    /*
    Subscribe to destination
    Provide a callback that should be called when data is received
    */
    subscribe(destination, callback) {
        this.subscriptions.push([destination,callback])
        if(this.isConnected) {
            this.stompClient.subscribe(destination, (response) => {
                callback(JSON.parse(response.body))
            });
        }
    }

    /*
    unsubscribe from destination
    */
    unsubscribe(destination) {
        this.stompClient.unsubscribe(destination);
    }
}


/*
export { SocketConnection,
        SocketConnection as socket};
*/
export default SocketConnection