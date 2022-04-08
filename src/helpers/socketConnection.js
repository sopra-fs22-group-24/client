
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
                var subscription = this.subscriptions[i];
                console.log(subscription[0]+", "+subscription[1])
                this.stompClient.subscribe(subscription[0],(response) => {
                    subscription[1](JSON.parse(response.body).content)
                }); 
            }
        })

    }


    /*
    Send content to destination
    */
    send(destination, content) {
        if(!this.isConnected) {
            throw Error("Websocket not connected")
        }
        console.log(content)
        this.stompClient.send(destination, {token: localStorage.getItem("token"),lobbyId: localStorage.getItem("lobbyId")}, JSON.stringify(content));
    }

    /*
    Subscribe to destination
    Provide a callback that should be called when data is received
    */
    subscribe(destination, callback) {
        this.subscriptions.push([destination,callback])
        if(this.isConnected) {
            this.stompClient.subscribe(destination, (response) => {
                console.log("miau")
                console.log(JSON.parse(response.body).content);
                callback(JSON.parse(response.body.content))
            });
        }
    }
}



export default SocketConnection