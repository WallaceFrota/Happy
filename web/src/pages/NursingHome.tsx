import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from "react-router-dom";

import api from "../services/api";

import Sidebar from "../components/Sidebar"
import mapIcon from "../utils/mapIcon";

import '../styles/pages/nursing-home.css';

interface NursingHome {
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  latitude: number;
  longitude: number;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface NursingHomeRouteParams {
  id: string;
}

export default function NursingHome() {
  const params = useParams<NursingHomeRouteParams>();
  const [nursinghome, setNursingHome] = useState<NursingHome>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
      api.get(`/nursinghomes/${params.id}`).then(response => {            
          setNursingHome(response.data);
      })
  }, [params.id]);

  // verifica se já está setado
  if(!nursinghome) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="page-nursing-home">
      
      <Sidebar />

      <main>
        <div className="home-details">
          <img src={`${nursinghome.images[activeImageIndex].url}`} alt={nursinghome.name}/>

          <div className="images">
              {nursinghome.images.map((image, index) => (
                <button 
                  key={image.id} 
                  className={activeImageIndex === index ? 'active' : ''} 
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(index)
                  }}
                >
                  <img src={image.url} alt={nursinghome.name} />
                </button>
              ))}
          </div>
          
          <div className="home-details-content">
            <h1>{nursinghome.name}</h1>
            <p>{nursinghome.about}</p>

            <div className="map-container">
              <Map 
                center={[nursinghome.latitude, nursinghome.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker interactive={false} icon={mapIcon} position={[nursinghome.latitude, nursinghome.longitude]} />
              </Map>

              <footer>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${nursinghome.latitude},${nursinghome.longitude}`} target="_blank" rel="noopener noreferrer">Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{nursinghome.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {nursinghome.opening_hours}
              </div>

              {nursinghome.open_on_weekends ? (
                  <div className="open-on-weekends">
                    <FiInfo size={32} color="#39CC83" />
                    Atendemos <br />
                    fim de semana
                  </div>
              ) : (
                    <div className="open-on-weekends dont-open">
                      <FiInfo size={32} color="#FF669D" />
                      Não atendemos <br />
                      fim de semana
                    </div>
              )}

            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}