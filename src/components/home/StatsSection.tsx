export default function StatsSection() {
    const stats = [
        {
            number: "5.000+",
            label: "Descartes realizados",
        },
        {
            number: "120+",
            label: "Pontos de coleta",
        },
        {
            number: "35",
            label: "Cidades atendidas",
        },
        {
            number: "98%",
            label: "Usuários satisfeitos",
        },
    ];

    return (
        <section className="bg-white py-24">

            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-8 lg:grid-cols-4">

                {stats.map((item) => (
                    <div
                        key={item.label}
                        className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                    >
                        <h2 className="text-5xl font-bold text-emerald-600">
                            {item.number}
                        </h2>

                        <p className="mt-4 text-slate-500">
                            {item.label}
                        </p>
                    </div>
                ))}

            </div>

        </section>
    );
}