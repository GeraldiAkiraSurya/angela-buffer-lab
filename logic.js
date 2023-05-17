const baseUrl="/angela-buffer-lab"

const userData = new FormData();
userData.set('id', userid);
userData.set('email',email)
userData.set('token', token);


var logic=[false,false,false,false,false]



function start(misi,soal){
    userData.set("misi",misi)
    userData.set("soal",soal)

    fetch(`${window.location.origin}${baseUrl}/mulai`,{
        method: "POST",
        redirect: "follow",
        body: userData,
        }).then(response => response.text()) .then(response=>{
            console.log(response)
        }).catch((error) => {
            console.log(error)
        });
    }

function done(misi,soal){
        userData.set("misi",misi)
        userData.set("soal",soal)
        fetch(`${window.location.origin}${baseUrl}/beres`,{
            method: "POST",
            redirect: "follow",
            body: userData,
            }).then(response => response.text()) .then(response=>{
                console.log(response)
            }).catch((error) => {
                console.log(error)
            });
        }

function health(heal,value){ 

    userData.set("value",value)

    let url;
    if (heal){
        url=`${window.location.origin}${baseUrl}/berobat`
    }else{
        url=`${window.location.origin}${baseUrl}/kenaHit`
    }

    fetch(url,{
        method: "POST",
        body: userData,
        }).then(response => response.text()) .then(response=>{
            if(response=="dead"){
                alert("you are dead")
            }else if(response=="max"){
                alert("max hp")
            }else if(response=="true"){
                console.log("you get hit")
            }
        }).catch((error) => {
            console.log(error)
        });
    }

function missionMenu(){ 
    let request = new XMLHttpRequest();
    var url = `${window.location.origin}${baseUrl}/permisi`;
    request.open('POST', url, false);

    request.send(userData);
    return JSON.parse(request.responseText);
    }