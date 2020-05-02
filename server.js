const { WebClient } = require('@slack/web-api');
const express = require('express')
const port = 8080;
const host = 'localhost'

app = express();

app.use(express.json());


//Slack objects
const token = "xoxb-1086364249794-1086368057186-gKx5vtZZcj2pRsQVViUpuB8K";
const web = new WebClient(token);


app.post('/', async (req, res) => {
    console.log("app mentioned")
    console.log(req.body)

    let isBot = req.body.event.bot_profile;


    if (!isBot) {
        const result = await web.chat.postMessage({
            text: "It works",
            channel: "#api-calls",
        });
    }

    res.sendStatus(200)
    
    console.log("Slack call finished")
    getincidentdetails("INC0010111")
    
})

app.listen(port, host, () => {
    console.log(`Started server on http:\\\\${host}:${port}`)
})

// function getincidentdetails() {

// var requestBody = ""; 

// var client=new XMLHttpRequest();
// client.open("get","https://dev97948.service-now.com/api/451809/getincidentdetails/" + incidentNumber);

// client.setRequestHeader('Accept','application/json');
// client.setRequestHeader('Content-Type','application/json');

// client.setRequestHeader('Authorization', 'Basic '+btoa('admin'+':'+'BfekQKuC1e8W'));

// client.onreadystatechange = function() { 
// 	if(this.readyState == this.DONE) {
// 		document.getElementById("response").innerHTML=this.status + this.response; 
// 	}
// }; 
// client.send(requestBody);

// }

incidentNumber = ""

function getincidentdetails(incidentNumber, callbackFunc) {

    let header = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Basic ' + 'YWRtaW46QmZla1FLdUMxZThX'
        },
        body: null,
    }


    fetch("https://dev97948.service-now.com/api/451809/getincidentdetails/" + incidentNumber, header)
        .then((res) => {
            if (res.status === 404) {
                console.log("No incident.")
            }
            else {
                res.json().then(function (data) {
                    console.log(data);
                    // callbackFunc(JSON.parse(data))
                });
            }
        })
}


