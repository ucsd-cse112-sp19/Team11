
export function spawnNotifDefault(type, title, message, position, duration, hideClose) {
    var newNotification = `<beer-notification-lit title="Button page">
                            Notification Message here
                           </beer-notification-lit>`;
    document.querySelector("body").insertAdjacentHTML("beforeend", newNotification); 
}

export function spawnNotifSuccess(type, title, message, position, duration, hideClose) {
    var newNotification = `<beer-notification-lit type="success" title="Default" duration="7500">
                                Congratulations class of 2019! You made it. Isn't that awesome :D
                                This message is to be longer than the other ones to show that
                                the notification will dynamically adjust its height depending on
                                how much text you have. But then again why would you want
                                a notification to be an essay lol.
                          </beer-notification-lit>`;
    document.querySelector("body").insertAdjacentHTML("beforeend", newNotification); 
}

export function spawnNotifWarning(type, title, message, position, duration, hideClose) {
    var newNotification = `<beer-notification-lit type="warning" title="Warning" duration="7500">
                            Notification Message here
                          </beer-notification-lit>`;
    document.querySelector("body").insertAdjacentHTML("beforeend", newNotification); 
}

export function spawnNotifInfo(type, title, message, position, duration, hideClose) {
    var newNotification = `<beer-notification-lit type="info" title="Info" duration="7500">
                            Notification Message here
                          </beer-notification-lit>`;
    document.querySelector("body").insertAdjacentHTML("beforeend", newNotification); 
}

export function spawnNotifDanger(type, title, message, position, duration, hideClose) {
    var newNotification = `<beer-notification-lit type="danger" title="Danger" duration="7500">
                            Notification Message here
                          </beer-notification-lit>`;
    document.querySelector("body").insertAdjacentHTML("beforeend", newNotification); 
}

export function spawnNotifMessage(type, title, message, position, duration, hideClose) {
    var newNotification = `<beer-notification-lit type="message" title="Message" duration="7500">
                            Notification Message here
                          </beer-notification-lit>`;
    document.querySelector("body").insertAdjacentHTML("beforeend", newNotification); 
}