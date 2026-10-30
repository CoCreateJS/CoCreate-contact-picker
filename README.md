# CoCreate Contact Picker

Helpers for the browser Contact Picker API.

## Install

```sh
yarn add @cocreate/contact-picker
```

## API

The module exports a default object with `isSupported()` and `getContacts(properties, options)`. Browser support and available properties depend on the device.

## Actions

Use the `getContacts` action on a user-activated element to open the native picker:

```html
<button actions="getContacts">Choose contacts</button>
```

When selection completes, the selected contacts are stored on the action element as `element.contacts`. The element also exposes `getContacts()`, `getValue()`, `getValueSync()`, `setValue()`, and `renderValue()` to match CoCreate File's element value pattern. `setValue()` and picker results feed the element's render targets. The action emits `contactsSelected` and completes its `getContacts` action event with the selected array at `event.detail.contacts`.

The action currently requests the module's default properties (`name`, `email`, and `tel`) for multiple contacts. Mapping individual contact properties into other inputs will be handled separately.

See [`demo/index.html`](demo/index.html) and [the documentation](docs/index.html).
