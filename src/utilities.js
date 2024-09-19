function regexInput(input) {
    const escapedInput = input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(escapedInput, 'i');
}

function filterAndSortDevices(devices, searchString, deviceTypeFilter, sortOrder) {
    if (!searchString) {
        searchString = null;
    } else {
        searchString = regexInput(searchString);
    }
    return devices
        .filter((device) => {
            const matchesType =
                deviceTypeFilter === 'all' || device.type === deviceTypeFilter;
            const matchesSearch = searchString
                ? searchString.test(device.system_name) ||
                  searchString.test(device.type) ||
                  searchString.test(device.hdd_capacity.toString())
                : true;
            return matchesType && matchesSearch;
        })
        .sort((a, b) => {
            const capacityA = parseInt(a.hdd_capacity, 10);
            const capacityB = parseInt(b.hdd_capacity, 10);
            if (capacityA !== capacityB) {
                return sortOrder === 'descending' ? capacityB - capacityA : capacityA - capacityB;
            }
            return a.system_name.localeCompare(b.system_name);
        });
}


export { regexInput, filterAndSortDevices };