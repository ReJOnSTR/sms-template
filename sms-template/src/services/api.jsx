import axios from "axios";

axios
  .get("http://192.168.1.215:51080/api/app/sms-baslik")
  .then((res) => res.data;
  console.log(res.data)
)
  .catch(console.err);
