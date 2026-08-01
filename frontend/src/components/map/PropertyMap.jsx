import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './PropertyMap.css';
import { Maximize, Minimize, X } from 'lucide-react';
import { formatPriceShort, formatPrice } from '../../data/mockData';

const createCustomIcon = (price) => {
  return L.divIcon({
    className: 'custom-map-marker',
    html: `<div>${formatPriceShort(price)}</div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

const createClusterCustomIcon = (cluster) => {
  const count = cluster.getChildCount();
  return L.divIcon({
    className: 'custom-map-marker cluster-marker',
    html: `<div>${count} phòng</div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

const FullScreenControl = ({ isFullScreen, toggleFullScreen }) => {
  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control custom-fullscreen-control">
        <button onClick={toggleFullScreen} title="Toàn màn hình">
          {isFullScreen ? <Minimize size={16} /> : <Maximize size={16} />}
          <span>Toàn màn hình</span>
        </button>
      </div>
    </div>
  );
};

const PropertyMap = ({ rooms = [] }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [popupRooms, setPopupRooms] = useState(null);
  const clusterRef = useRef();

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  };

  useEffect(() => {
    if (clusterRef.current) {
      // Unbind previous event to avoid duplicates
      clusterRef.current.off('clusterclick');
      clusterRef.current.on('clusterclick', (e) => {
        const markers = e.layer.getAllChildMarkers();
        const clusterRooms = markers.map(m => m.options.roomData).filter(Boolean);
        setPopupRooms(clusterRooms);
      });
    }
  }, [rooms]);

  const defaultCenter = [10.80, 106.70];

  return (
    <div className={`property-map-wrapper ${isFullScreen ? 'fullscreen' : ''}`}>
      <MapContainer 
        center={defaultCenter} 
        zoom={11} 
        scrollWheelZoom={true}
        className="property-map-container"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <ZoomControl position="topleft" />
        <FullScreenControl isFullScreen={isFullScreen} toggleFullScreen={toggleFullScreen} />

        <MarkerClusterGroup
          ref={clusterRef}
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
          maxClusterRadius={50}
          showCoverageOnHover={false}
          zoomToBoundsOnClick={false} // Disable auto zoom on cluster click
        >
          {rooms.map((room) => {
            if (!room.lat || !room.lng) return null;
            return (
              <Marker 
                key={room.id} 
                position={[room.lat, room.lng]} 
                icon={createCustomIcon(room.price)}
                roomData={room} // Custom prop to store room data
                eventHandlers={{
                  click: () => {
                    setPopupRooms([room]);
                  }
                }}
              />
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>

      {/* Custom Popup Modal */}
      {popupRooms && popupRooms.length > 0 && (
        <div className="map-popup-overlay" onClick={() => setPopupRooms(null)}>
          <div className="map-popup-content" onClick={e => e.stopPropagation()}>
            <div className="map-popup-header">
              <h3>{popupRooms.length > 1 ? `Khu vực này có ${popupRooms.length} phòng` : 'Chi tiết phòng'}</h3>
              <button className="map-popup-close" onClick={() => setPopupRooms(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="map-popup-list">
              {popupRooms.map(room => (
                <div key={room.id} className="map-popup-item">
                  <img src={room.thumbnails?.[0] || 'https://via.placeholder.com/100'} alt={room.title} />
                  <div className="map-popup-info">
                    <h4 className="map-popup-title" title={room.title}>{room.title}</h4>
                    <p className="map-popup-price">{formatPrice(room.price)}</p>
                    <p className="map-popup-address">{room.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyMap;
