import { useSpring, animated } from "@react-spring/web";

const AnimatedComponent = () => {
  const styles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 2000 },
  });

  return <animated.div style={styles}>Hej från React Spring!</animated.div>;
};

export default AnimatedComponent;
