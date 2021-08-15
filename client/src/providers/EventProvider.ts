import Echo from "laravel-echo";

class EventProvider {
	defaultEchoEvent() {
		const EchoEvent = new Echo({
			broadcaster: "pusher",
			key: process.env.REACT_APP_MIX_PUSHER_APP_KEY,
			cluster: process.env.REACT_APP_MIX_PUSHER_APP_CLUSTER,
			forceTLS: false,
			wsHost: window.location.hostname,
			wsPort: 6001,
		});

		return EchoEvent;
	}
}

export default new EventProvider();
