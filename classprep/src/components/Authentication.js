export default function Authenticated(){
    return JSON.parse(localStorage.getItem('token'))?.authentication == "authenticated"
}