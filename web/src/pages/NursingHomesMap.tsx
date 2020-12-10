import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';

import api from '../services/api';

import mapIcon from '../utils/mapIcon';
import mapMarkerImg from '../images/map-marker.svg'

import '../styles/pages/nursing-homes-map.css';


interface NursingHomes {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function NursingHomesMap() {

    const [nursinghomes, setNursingHomes] = useState<NursingHomes[]>([])

    useEffect(() => {
        api.get('/nursinghomes').then(response => {            
            setNursingHomes(response.data);
        })
    }, [])

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Escolha um lar no mapa</h2>
                    <p>Muitos idosos estão esperando a sua visita.</p>
                </header>

                <footer>
                    <strong>Castanhal</strong>
                    <span>Pará</span>
                </footer>
            </aside>

            <Map 
                center={[-1.2808948,-47.9515193]}
                zoom={15}
                style={{ width: '100%', height: '100%'}}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {nursinghomes.map(nursinghome => {
                    return (
                        <Marker
                            key={nursinghome.id}
                            icon={mapIcon}
                            position={[nursinghome.latitude,nursinghome.longitude]}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {nursinghome.name}

                                <Link to={`/nursinghomes/${nursinghome.id}`}>
                                    <FiArrowRight size={24} color="#fff"/>
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}
            </Map>

            <Link to="/nursinghomes/create" className="create-nursing-home">
                <FiPlus size={32} color="#fff"/>
            </Link>            
        </div>
    )
}

export default NursingHomesMap;