import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export const Map = () => {
    const posicion = [10.22849, -67.317];
    return (
        <div className="container map">
            <MapContainer center={posicion} zoom={16} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <Marker position={posicion}>
                    <Popup>¡Aquí estamos! 📍</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
