import React from "react";

export default function FadeInSection(props) {
  const [isVisible, setVisible] = React.useState(false);
  const domRef = React.useRef();
  React.useEffect(() => {
    const node = domRef.current;
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      });
    });

    observer.observe(node);
    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);
  return (
    <div
      className={`transform
        transition-all
        duration-700
        ease-out   ${isVisible ? "translate-y-0 opacity-100"   : "translate-y-5 opacity-0"}`}
      style={{ transitionDelay: `${props.delay}` }}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}
