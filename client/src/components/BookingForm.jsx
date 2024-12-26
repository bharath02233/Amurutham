import React, { useEffect, useState } from 'react'
import axios from 'axios'
function BookingForm() {
  var [booking, setBooking] = useState({ name: '', phone: '', doctor: '', amount: '', date: '',status:'NA'});
  var [elligble, setElligble] = useState(false);
  var [doctor, setDoctor] = useState([]);
  var [chang,setChang]=useState(false)
  function handlechange(ev) {
    var temp = { ...booking };
    if(ev.target.name=="phone")
    {
      temp[ev.target.name] = +(ev.target.value);  
    }
    else{
    temp[ev.target.name] = ev.target.value;
    }
    setBooking(temp);
  }
  function handlechange1(ev)
  {
    var temp={...booking};
    temp["doctor"]=+(ev.target.value);
    var fil=doctor?.filter((ob)=>ob.uid==ev.target.value)
    temp["amount"]=fil[0].price;
    temp["date"]=new Date().toDateString();
     setChang(true);
    setBooking(temp);
  }
  


  function handleVerify() {
    if (booking.phone.toString().length === 10) {
      axios.get(`http://localhost:5000/book/phone/${booking.phone}`).then((res) => {
        setElligble(res.data.status);
      })
    }
  }

  

  useEffect(() => {
    axios.get("http://localhost:5000/doctors").then((res) => {
      setDoctor(res.data);
    })
  },[])
  
  
  if(elligble && chang)
  {
    
    var temp={...booking};

    var tprice=booking.amount-(booking.amount*(20/100));
    temp["amount"]=tprice;
    temp["status"]='ELLIGBLE';
    setBooking(temp);
    setChang(false);
  }
  console.log(elligble)
  console.log(booking);

  function handleSubmit()
  {
    axios.post("http://localhost:5000/book/bokkings",booking).then((res)=>console.log(res)).catch((res)=>{console.log(res)})
  }


  return (
    <div>
      <div style={{ textAlign: 'center', fontFamily: 'cursive', fontSize: '20px', backgroundColor: 'orange' }}>Book Apoinments</div>
      <div style={{ width: '400px', backgroundColor: 'lightblue', margin: 'auto', display: 'flex', flexDirection: 'column', padding: "10px", marginTop: '10px', borderRadius: '5px', gap: "10px" }}>
        <div style={{ display: 'flex' }}>
          <span style={{ fontFamily: 'cursive', flex: 0.5, textAlign: 'end' }}>Name:</span>
          <input style={{ flex: 0.3 }} placeholder='enter name' name="name" onChange={handlechange} ></input>
        </div>
        <div style={{ display: 'flex', position: 'relative' }}>
          <span style={{ fontFamily: 'cursive', flex: 0.5, textAlign: 'end' }}>Phone:</span>
          <input style={{ flex: 0.3 }} name="phone" type="number" onChange={handlechange} ></input>
          <button style={{ fontSize: '11px', fontFamily: 'cursive', position: 'absolute', right: '79px' }} onClick={handleVerify}>Verify</button>
        </div>
        <div style={{ display: 'flex' }}>
          <span style={{ flex: 0.38, textAlign: 'end', fontFamily: 'cursive' }}>Doctor list:</span>
          {/* <input style={{ flex: 0.3 }}></input> */}
          <select style={{ flex: 0.42 }} onChange={handlechange1}>
            {doctor?.map((ob)=>{
               return <option name={ob.name} value={ob.uid}>{ob.name}--{ob.price}</option>
          
            })}
             </select>
        </div>
        <div style={{ display: 'flex' }}>
          <span style={{ flex: 0.5, textAlign: 'end', fontFamily: 'cursive' }}>Total Price:</span>
          <input style={{ flex: 0.3 }} value={booking.amount} disabled></input>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button style={{ backgroundColor: 'lightgreen', fontFamily: 'cursive', fontSize: '20px', borderRadius: '5px' }} onClick={handleSubmit}>Book</button>
        </div>
      </div>
    </div>
  )
}

export default BookingForm