import { motion } from "framer-motion";

const About = () => {
	return (
		<motion.div
			className="col s12 m12 l12"
			initial={{ opacity: 0, x: -500 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 800 }}>
			Welcome to TheMealDB Welcome to TheMealDB: An open, crowd-sourced
			database of Recipes from around the world. We also offer a free JSON
			API for anyone wanting to use it, with additional features for
			subscribers.{" "}
		</motion.div>
	);
};

export default About;
