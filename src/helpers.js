import axios from "axios";
import VueSimpleAlert from "vue-simple-alert";

export function saveUser(url, token) {
    axios.get(url, { 'headers': { 'Authorization': token } })
        .then(resp => {
            console.log(resp);
            if(resp.status === 200){
                VueSimpleAlert.alert("Logged In succesfully")
                console.log('saved the user!!!');
            }
            else {
                console.log("bad request by client");
                alert("something went wrong")
            }
        }).catch(err => {
        console.log(err)
    })
}


