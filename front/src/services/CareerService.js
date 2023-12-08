import axios from "axios";

class CareerService{
    getCareers(){
        return axios.get('http://localhost:8090/careers');
    }

}

export default new CareerService();