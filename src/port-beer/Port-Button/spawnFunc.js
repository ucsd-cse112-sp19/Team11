// These are user-defined functions that the user wants a button to do when they click on a button
// The ones here are just sample ones that will spawn a notification onto the screen when
// the user clicks on the corresponding button element which has the functionName attribute defined
//
// For example:
//     <beer-button-lit script="./spawnFunc.js" functionName="spawnNotifDefault"> Click Me! </beer-button-lit>
//     Clicking on this button will trigger the spawnNotifDefault function inside the javascript file "spawnFunc.js"
//
// To change the text and atributes of the notification spawned, just change it in the literal template
//     <beer-notification-lit title="Button page"> Notification Message here </beer-notification-lit>


export function spawnNotifMessage(type, title, message, position, duration, hideClose) {
    var newNotification = `<beer-notification-lit type="message" title="Notification Title" position="top-right" duration="7500">
                            Message
                           </beer-notification-lit>`;
    document.querySelector("body").insertAdjacentHTML("beforeend", newNotification); 
}

export function spawnNotif(type, title, message, position, duration, hideClose) {
    var newNotification = `<beer-notification-lit title="Notification Title" position="top-right" duration="7500">
                            Default
                           </beer-notification-lit>`;
    document.querySelector("body").insertAdjacentHTML("beforeend", newNotification); 
}

export function spawnNotifMail(type, title, message, position, duration, hideClose) {
    var newNotification = `<beer-notification-lit type="mail" title="Notification Title" position="top-right" duration="7500">
                            Mail
                           </beer-notification-lit>`;
    document.querySelector("body").insertAdjacentHTML("beforeend", newNotification); 
}

export function spawnNotifWarning(type, title, message, position, duration, hideClose) {
    var newNotification = `<beer-notification-lit type="warning" title="Notification Title" position="top-right" duration="7500">
                            Warning
                           </beer-notification-lit>`;
    document.querySelector("body").insertAdjacentHTML("beforeend", newNotification); 
}

export function spawnNotifSuccess(type, title, message, position, duration, hideClose) {
    var newNotification = `<beer-notification-lit type="success" title="Notification Title" position="top-right" duration="7500">
                            Success
                           </beer-notification-lit>`;
    document.querySelector("body").insertAdjacentHTML("beforeend", newNotification); 
}

export function spawnNotifDanger(type, title, message, position, duration, hideClose) {
    var newNotification = `<beer-notification-lit type="danger" title="Notification Title" position="top-right" duration="7500">
                            Danger
                           </beer-notification-lit>`;
    document.querySelector("body").insertAdjacentHTML("beforeend", newNotification); 
}

export function spawnNotifInfo(type, title, message, position, duration, hideClose) {
    var newNotification = `<beer-notification-lit type="info" title="Notification Title" position="top-right" duration="7500">
                            Danger
                           </beer-notification-lit>`;
    document.querySelector("body").insertAdjacentHTML("beforeend", newNotification); 
}