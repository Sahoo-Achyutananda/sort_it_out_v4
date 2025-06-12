import { useEffect, useRef } from "react";
import Typed from "typed.js";

const TypedText = ({ children }) => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: children,
      typeSpeed: 50,
      backSpeed: 25,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, [children]);

  return <span ref={el} />;
};

export default TypedText;
