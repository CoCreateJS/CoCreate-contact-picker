import Actions from "@cocreate/actions";
import { render } from "@cocreate/render";

const initializedElements = new WeakSet();

/**
 *
 * @public
 * @environment client
 */
function isSupported() {
    return typeof navigator.contacts?.select === "function";
}

/**
 *
 * @public
 * @environment client
 */
async function getContacts(properties = ["name", "email", "tel"], options = { multiple: true }) {
    if (!isSupported())
        throw new Error("The Contact Picker API is not supported in this browser.");
    return navigator.contacts.select(properties, options);
}

/**
 *
 * @public
 * @environment client
 */
function init(elements) {
    if (!elements) return;
    if (!Array.isArray(elements) && !(elements instanceof NodeList) && !(elements instanceof HTMLCollection))
        elements = [elements];

    for (const element of elements) {
        if (!element || initializedElements.has(element)) continue;
        initializedElements.add(element);

        if (!Array.isArray(element.contacts)) element.contacts = [];
        element.getContacts = () => element.contacts;
        element.getValue = () => element.contacts;
        element.getValueSync = () => element.contacts;
        element.setValue = (contacts) => setContacts(element, contacts);
        element.renderValue = (contacts) => setContacts(element, contacts);
    }
}

/**
 *
 * @public
 * @environment client
 */
function setContacts(element, contacts) {
    if (!element) return [];
    init(element);
    if (!Array.isArray(contacts)) contacts = contacts == null ? [] : [contacts];

    element.contacts = contacts;
    render({ source: element, data: contacts, key: "object" });
    return contacts;
}

async function runGetContacts(action) {
    try {
        init(action.element);
        const contacts = await getContacts();
        setContacts(action.element, contacts);
        action.element.dispatchEvent(new CustomEvent("contactsSelected", {
            bubbles: true,
            detail: { contacts }
        }));
        action.end({ contacts });
    } catch (error) {
        action.abort(error);
    }
}

Actions.init({ name: "getContacts", callback: runGetContacts });

export { init, setContacts, isSupported, getContacts };
export default { init, setContacts, isSupported, getContacts };

/**
 * Helpers for the browser Contact Picker API.
 *
 * @module contact-picker
 * @environment client
 */

/**
 * Declarative actions supported or registered by this module.
 *
 * @name declarative-actions
 * @kind member
 * @actions
 * @environment client
 * @example
 * ```json
 * [
 *   {
 *     "name": "getContacts"
 *   }
 * ]
 * ```
 */
