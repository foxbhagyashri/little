import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import LogoComponent from "./Logo";
import { useLocation } from "wouter";
import { Link } from "react-router-dom";

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false);
	const [, setLocation] = useLocation();

	// navigation items used by mobile menu and other sections
	const items = [
		{ label: "Home", id: "home", href: "/" },
		{ label: "About", href: "/about" },
		{ label: "Programs", href: "/programs" },
		{ label: "Why Choose Us", href: "/why" },
		{ label: "Gallery", href: "/gallery" },
		{ label: "Contact", href: "/contact" },
		{ label: "Branches", href: "/branches" },
		{ label: "Franchise", href: "/franchise" },
		{ label: "Career", href: "/career" },
	];

	// navigate to root then scroll to an id (pass null/undefined to just go home)
	const goTo = (id) => {
		setLocation("/");
		setTimeout(() => {
			if (!id) return;
			const el = document.getElementById(id);
			if (el) el.scrollIntoView({ behavior: "smooth" });
			else window.location.hash = `#${id}`;
		}, 80);
	};

	return (
		<>
			{/* Floating Logo */}
			<LogoComponent />

			<nav
				className="
				  fixed top-0 left-0 right-0 z-50 
				  bg-white/80 backdrop-blur-lg 
				  shadow-lg border-b border-transparent
				  rounded-b-2xl sm:rounded-b-3xl
				  animate-slide-down
				"
			>
				{/* Rainbow bar */}
				<div className="absolute inset-x-0 top-0 h-1.5 sm:h-2 bg-gradient-to-r from-pink-400 via-yellow-400 to-blue-400 rounded-b-full"></div>

				<div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
					{/* NAVBAR ROW */}
					<div className="flex justify-between items-center h-[60px] md:h-auto">
						{/* Left spacer to match floating logo width (hidden on mobile and small tablets) */}
						<div className="hidden lg:block w-44 xl:w-56 flex-shrink-0" aria-hidden="true" />
						{/* Desktop Menu - wrap on smaller screens, hide on mobile */}
						<div className="hidden md:flex items-center gap-0.5 lg:gap-1  justify-center h-[100px]">
							{/* Home */}
							<button
								type="button"
								onClick={() => goTo("home")}
								className="text-sm lg:text-base xl:text-lg font-semibold text-gray-700 px-2 lg:px-3 xl:px-4 py-1.5 lg:py-2 rounded-full hover:bg-yellow-200 transition-colors whitespace-nowrap"
							>
								Home
							</button>

							{/* About */}
							<button
								onClick={() => setLocation("/about")}
								className="text-sm lg:text-base xl:text-lg font-semibold text-gray-700 px-2 lg:px-3 xl:px-4 py-1.5 lg:py-2 rounded-full hover:bg-yellow-200 transition-colors whitespace-nowrap"
							>
								About
							</button>

							{/* Programs */}
							<button
								type="button"
								onClick={() => setLocation("/programs")}
								className="text-sm lg:text-base xl:text-lg font-semibold text-gray-700 px-2 lg:px-3 xl:px-4 py-1.5 lg:py-2 rounded-full hover:bg-yellow-200 transition-colors whitespace-nowrap"
							>
								Programs
							</button>

							{/* Gallery */}
							<button
								type="button"
								onClick={() => setLocation("/gallery")}
								className="text-sm lg:text-base xl:text-lg font-semibold text-gray-700 px-2 lg:px-3 xl:px-4 py-1.5 lg:py-2 rounded-full hover:bg-yellow-200 transition-colors whitespace-nowrap"
							>
								Gallery
							</button>

							{/* Contact */}
							<button
								type="button"
								onClick={() => setLocation("/contact")}
								className="text-sm lg:text-base xl:text-lg font-semibold text-gray-700 px-2 lg:px-3 xl:px-4 py-1.5 lg:py-2 rounded-full hover:bg-yellow-200 transition-colors whitespace-nowrap"
							>
								Contact
							</button>

							{/* Branches */}
							<Link
								to="/branches"
								className="text-sm lg:text-base xl:text-lg font-semibold text-gray-700 px-2 lg:px-3 xl:px-4 py-1.5 lg:py-2 rounded-full hover:bg-yellow-200 transition-colors whitespace-nowrap"
							>
								Branches
							</Link>

							{/* Franchise */}
							<Link
								to="/franchise"
								className="text-sm lg:text-base xl:text-lg font-semibold text-gray-700 px-2 lg:px-3 xl:px-4 py-1.5 lg:py-2 rounded-full hover:bg-yellow-200 transition-colors whitespace-nowrap"
							>
								Franchise
							</Link>

							{/* Career */}
							<Link
								to="/career"
								className="text-sm lg:text-base xl:text-lg font-semibold text-gray-700 px-2 lg:px-3 xl:px-4 py-1.5 lg:py-2 rounded-full hover:bg-yellow-200 transition-colors whitespace-nowrap"
							>
								Career
							</Link>

							<Button
								onClick={() => setLocation("/enroll")}
								className="
				  ml-2 lg:ml-4 xl:ml-6
				  rounded-full px-3 lg:px-4 py-1.5 lg:py-2 text-sm lg:text-base font-bold
				  bg-gradient-to-r from-pink-500 to-purple-600 
				  text-white shadow-md hover:shadow-xl hover:scale-105
				  transition-all whitespace-nowrap
				"
							>
								Enroll Now ✨
							</Button>
						</div>

						{/* Mobile Menu Button - always visible on mobile */}
						<button
							className="md:hidden p-2 bg-yellow-200 rounded-xl shadow hover:scale-110 transition ml-auto"
							onClick={() => setIsOpen(!isOpen)}
							aria-label="Toggle menu"
						>
							{isOpen ? <X className="w-6 h-6 sm:w-7 sm:h-7" /> : <Menu className="w-6 h-6 sm:w-7 sm:h-7" />}
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{isOpen && (
					<div className="md:hidden bg-white/90 backdrop-blur-xl rounded-b-2xl sm:rounded-b-3xl shadow-lg pb-4 sm:pb-6">
						{/* constrained height + native momentum scrolling for mobile */}
						<div
							className="px-4 sm:px-6 py-3 sm:py-4 space-y-2 sm:space-y-3 max-h-[70vh] sm:max-h-[75vh] overflow-y-auto overscroll-contain"
							style={{ WebkitOverflowScrolling: "touch" }}
						>
							<button
								type="button"
								onClick={() => { goTo("home"); setIsOpen(false); }}
								className="block w-full text-left text-base sm:text-lg font-semibold text-gray-700 bg-yellow-100 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl shadow hover:bg-yellow-200 transition-colors"
							>
								Home
							</button>

							<button
								onClick={() => { setLocation("/about"); setIsOpen(false); }}
								className="block w-full text-left text-base sm:text-lg font-semibold text-gray-700 bg-yellow-100 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl shadow hover:bg-yellow-200 transition-colors"
							>
								About
							</button>

							<button
								type="button"
								onClick={() => { setLocation("/programs"); setIsOpen(false); }}
								className="block w-full text-left text-base sm:text-lg font-semibold text-gray-700 bg-yellow-100 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl shadow hover:bg-yellow-200 transition-colors"
							>
								Programs
							</button>

							<button
								type="button"
								onClick={() => { setLocation("/gallery"); setIsOpen(false); }}
								className="block w-full text-left text-base sm:text-lg font-semibold text-gray-700 bg-yellow-100 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl shadow hover:bg-yellow-200 transition-colors"
							>
								Gallery
							</button>

							<button
								type="button"
								onClick={() => { setLocation("/contact"); setIsOpen(false); }}
								className="block w-full text-left text-base sm:text-lg font-semibold text-gray-700 bg-yellow-100 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl shadow hover:bg-yellow-200 transition-colors"
							>
								Contact
							</button>

							<Link
								to="/branches"
								onClick={() => setIsOpen(false)}
								className="block w-full text-left text-base sm:text-lg font-semibold text-gray-700 bg-yellow-100 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl shadow hover:bg-yellow-200 transition-colors"
							>
								Branches
							</Link>

							<Link
								to="/franchise"
								onClick={() => setIsOpen(false)}
								className="block w-full text-left text-base sm:text-lg font-semibold text-gray-700 bg-yellow-100 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl shadow hover:bg-yellow-200 transition-colors"
							>
								Franchise
							</Link>

							<Link
								to="/career"
								onClick={() => setIsOpen(false)}
								className="block w-full text-left text-base sm:text-lg font-semibold text-gray-700 bg-yellow-100 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl shadow hover:bg-yellow-200 transition-colors"
							>
								Career
							</Link>

							<Button
								onClick={() => { setLocation("/enroll"); setIsOpen(false); }}
								className="
				  block w-full rounded-full py-3 sm:py-4 text-base sm:text-lg font-bold
				  bg-gradient-to-r from-pink-500 to-purple-600 
				  text-white shadow-md hover:shadow-xl hover:scale-105
				  transition-all
				"
							>
								Enroll Now ✨
							</Button>
						</div>
					</div>
				)}
			</nav>
		</>
	);
}
