
export function spawnNotif(type, title, message, position, duration, hideClose) {
    var newNotification = `<beer-notification-lit type="message" title="Button page" duration="4500">
                            User Message here
                          </beer-notification-lit>`;
    document.querySelector("body").insertAdjacentHTML("beforeend", newNotification); 
}