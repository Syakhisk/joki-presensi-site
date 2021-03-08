import "../styles/globals.css";
import { AnimateSharedLayout } from "framer-motion";

function MyApp({ Component, pageProps }) {
	return (
		// wrapping components in AnimateSharedLayout to enable animation between components
		<AnimateSharedLayout>
			<Component {...pageProps} />
		</AnimateSharedLayout>
	);
}

export default MyApp;
