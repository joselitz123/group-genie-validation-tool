// @flow
import ggvtIcon from "../../../resources/icon.png";

var dts = Math.floor(Date.now());

const Notifier = (title: string, body: string) => {
  const notif = new Notification(title, {
    body: body,
    icon: ggvtIcon,
    actions: [],
    badge: "",
    data: "",
    dir: "auto",
    image: "",
    lang: "en-US",
    renotify: false,
    requireInteraction: false,
    silent: false,
    sound: "",
    timestamp: dts,
    tag: "GroupGenieValidationTool"
  });
};

export default Notifier;
