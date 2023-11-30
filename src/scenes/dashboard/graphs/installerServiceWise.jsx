const InstallerServiceWiseCard = () => {

    return (
        <Card className="px-4 m-4 w-[97%] flex">
            <List className="w-2/3">
                {cities.map((locationData) => (
                    <ListItem key={locationData.name} className="space-x-2">
                        <div className="flex items-center space-x-2 truncate">
                            <span
                                className={classNames(
                                    locationData.name === "Basic Install"
                                        ? "bg-indigo-500"
                                        : locationData.name === "Immidiate Install"
                                            ? "bg-violet-500"
                                            : locationData.name === "Advance Install"
                                                ? "bg-fuchsia-500"
                                                : locationData.name === "Advance 80 Install"
                                                    ? "bg-red-300"
                                                    : "",
                                    "h-2.5 w-2.5 rounded-sm flex-shrink-0",
                                )}
                            />
                            <span className="truncate">{locationData.name}</span>
                        </div>
                        {/* <span>{serviceMap[locationData.id].name}</span> */}
                    </ListItem>
                ))}
            </List>
            <DonutChart
                className="mt-6 px-8"
                data={cities}
                showLabel={true}
                category="sales"
                variant="pie"
                index="name"
                colors={["green", "yellow", "orange", "indigo", "blue", "emerald"]}
                onValueChange={(v) => setValue(v)}
                valueFormatter={valueFormatter}
                customTooltip={customTooltip}
            />
        </Card>
    )
}



export default InstallerServiceWiseCard;