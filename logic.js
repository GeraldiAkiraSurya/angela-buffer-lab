const baseUrl="/angela-buffer-lab"

const userData = new FormData();
userData.set('id', userid);
userData.set('email',email)
userData.set('token', token);




function minHealth(){

    fetch(`${window.location.origin}${baseUrl}/kenaHit`,{
        method: "POST",
        body: userData,
        }).then(response => response.text()) .then(response=>{
            if(response=="dead"){
                alert("you are dead")
            }else if(response=="true"){
                console.log("you get hit")
            }
        }).catch((error) => {
            console.log(error)
        });
    }

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

function nyobalLagi(misi,soal){
    userData.set("misi",misi)
    userData.set("soal",soal)
    fetch(`${window.location.origin}${baseUrl}/gagal`,{
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

function plusHealth(){
    fetch(`${window.location.origin}${baseUrl}/berobat`,{
        method: "POST",
        redirect: "follow",
        body: userData,
    }).then(response => response.text()) .then(response=>{
        console.log(response)
        if(response=="max"){
            alert("max hp reached")
        }else if(response=="true"){
            console.log("you get heal")
        }
    }).catch((error) => {
        console.log(error)
    });
    }