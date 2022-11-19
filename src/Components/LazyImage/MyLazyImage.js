import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { motion } from "framer-motion";


const MyLazyImage = ({ height,image,alt }) => {
    return <LazyLoadImage
        height={height}
        effect="blur"
        src={image}
        alt={alt} />
}

export default MyLazyImage;