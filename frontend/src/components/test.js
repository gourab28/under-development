import React, {useState, useEffect} from 'react';
import axios from 'axios';

function FAQ(props) {
  const [faq, setFaq] = useState([]);
  let Udata = localStorage.getItem("stats");
  let obj = JSON.parse(Udata);
  const [data] = useState(obj);
  
  useEffect(() => {
    getFAQs();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getFAQs = () => {
    axios
      .get('http://localhost:5000/api/stats')
      .then((response) => {
        setFaq(response['data']);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
 // const jso = JSON.parse(faq);
console.log(faq);
if(faq) {
  return(
    <>
     <div className="FAQ">
        {faq.users.length}
    </div>
    </>
)
}
  return (
    <div className="FAQ">
     Loading
    </div>
  );
}

export default FAQ;