function isSupported() {
    return typeof navigator.contacts?.select === "function";
}

async function getContacts(properties = ["name", "email", "tel"], options = { multiple: true }) {
    if (!isSupported())
        throw new Error("The Contact Picker API is not supported in this browser.");
    return navigator.contacts.select(properties, options);
}

export default { isSupported, getContacts };
