import { motion } from "framer-motion";
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconUrl,
    shadowUrl,
});

export default function MapSection() {
    return (
        <section className="bg-slate-50 py-32">

            <div className="mx-auto max-w-7xl px-8">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >

                    <h2 className="text-center text-5xl font-bold text-slate-900">
                        Encontre um Ecoponto
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-slate-500">
                        Localize rapidamente um ponto de descarte próximo da sua região.
                    </p>

                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 overflow-hidden rounded-3xl shadow-2xl"
                >

                    <MapContainer
                        center={[-23.55, -46.63]}
                        zoom={11}
                        scrollWheelZoom={false}
                        className="h-[600px] w-full"
                    >

                        <TileLayer
                            attribution='&copy; OpenStreetMap'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={[-23.55, -46.63]}>
                            <Popup>
                                EcoPoint Centro
                            </Popup>
                        </Marker>

                    </MapContainer>

                </motion.div>

            </div>

        </section>
    );
}