import React,  {  useEffect, useState } from 'react';
import './App.css';
import { v4 as uuid } from 'uuid';

function App() {
  const [film, setFilm] = useState("")
  const [harga, setHarga] = useState("")
  const [dataFilmList, setDataFilmList] = useState([{'artistName':'', 'collectionId': ''}])
  const [listBarang, setListBarang] = useState([])
  

  useEffect(() => {
    const fetchData = async () =>{
      const response = await fetch("https://itunes.apple.com/search?term=tom+cruise&entity")
      const newData = await response.json();
      
      setDataFilmList(newData.results.slice(1,5));
      console.log(newData.results.slice(1,4));
    };
    fetchData();
  },[])

  const handleFilmChange = (event) =>{
    event.preventDefault();
    setFilm(event.target.value);
    console.log(film);
  }

  const handleHarga = (event) =>{
    setHarga(event.target.value);
    console.log(harga);
  }


  const saveBtn = (e) =>{
    e.preventDefault();
    console.log(film + "-" + harga)
    if(harga === "" || film ==="")
    {
      alert("harga atau film tidak boleh kosong")
    }else{
      var intHarga = +harga
      const newItem = {
      id : new Date().getTime().toString(),
      film,
      s : "-",
      intHarga
    }
    setListBarang([newItem,...listBarang])
    console.log(harga);
    setFilm("")
    setHarga("")
    }
    
  }

  return (
    <div className="App back">
      <div className="container-fluid mt-5">
        <div className="row" style={{width:"100%", paddingBottom:"400px"}}>
          <div className="col-sm-6" style={{paddingBottom:"800px"}}>
            <div className="card" style={{borderRadius:"10%"}}>
              <div className="card-header text-center text-dark">
              </div>
              <div className="card-body" style={{paddingBottom:"200px"}}>
                <h5 className="text-center text-dark">RENTAL DVD</h5>
                <ul className="list-group list-group-numbered text-start mt-4">
                  {/* <li className="list-group-item">armageddon - Rp.5000</li> */}
                  {
                    listBarang.map(item =>(
                      <li className="list-group-item" value={item.newItem} key={item.id}>{item.film}-Rp.{item.intHarga}</li>
                    ))
                  }
                </ul>
              </div>
              <div className="card-footer">
                <div className="row">
                  <div className="col text-dark"><b>TOTAL</b></div>
                  
                  <div className="col text-dark" ><b>RP.{listBarang.reduce((total, i) => total = total + i.intHarga,0)}</b></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-3 ms-3 ps-3">
            <div className="card" style={{borderRadius:"10%"}}>
              <div className="card-body" style={{paddingBottom:"30px"}}>
                <form className="mt-3">
                  <label className="text-dark text-start">
                    Judul Film
                    <select className="form-control text-dark d-inline-flex" value={film} onChange={handleFilmChange} aria-label="default select example">                     
                      <option value="">choose film name...</option>
                      {
                        dataFilmList.map(item =>(
                          <option value={item.artistName} key={item.collectionId}>{item.artistName}</option>
                        ))
                      }
                    </select> 
                  </label>
                  <label className="text-dark text-start mt-2 ">
                    Harga
                    <input required type="number" className="form-control d-flex" value={harga} onChange={handleHarga} style={{marginRight:"47px"}} placeholder="RP."></input>
                  </label>
                  <button type="button" onClick={saveBtn} className="btn btn-primary btn-sm mt-3" >Primary</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
