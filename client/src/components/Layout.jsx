import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

export default function Layout({ children }) {
	return (
		<>
			<Navigation />
			<main className="min-h-screen pt-20">{children}</main> {/* reduced top padding */}
			<Footer />
		</>
	);
}
