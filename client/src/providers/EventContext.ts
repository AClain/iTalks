import { createContext } from "react";
import Echo from "laravel-echo";

declare type EventContextProps = {
	event: any;
};

const EchoEvent = new Echo({
	broadcaster: "pusher",
	key: process.env.REACT_APP_MIX_PUSHER_APP_KEY,
	cluster: process.env.REACT_APP_MIX_PUSHER_APP_CLUSTER,
	forceTLS: false,
	wsHost: window.location.hostname,
	wsPort: 6001,
});

const DEFAULT_CONTEXT: EventContextProps = {
	event: EchoEvent,
};

export const EventContext = createContext<Partial<EventContextProps>>(DEFAULT_CONTEXT);
