import Image from "next/image";

type Display = {
  type?: "ICON" | "REGULAR";
  size?: "SMALL";
};

type BaseProps = {
  display?: Display;
  onClick?: () => void;
};

type IconImage = {
  src: string,
  alt: string,
}

type IconProps = BaseProps & {
  display: { type: "ICON"; size?: "SMALL" };
  icon: IconImage;
};

type RegularProps = BaseProps & {
  display: { type: "REGULAR"; size?: "SMALL" };
  icon?: IconImage;
};

type Props = IconProps | RegularProps;


export default function Button(props: Props) {
  const handleClick = () => {
    props.onClick?.();
  };


  if (props.display.type === "ICON" && props.icon) {
    let width, height;
  
    if (props.display.size === "SMALL") {
      width = 42;
      height = 42;
    } else {
      width = 50;
      height = 50;
    }

    return (
      <button
        className="flex p-2"
        onClick={handleClick}
      >
        <Image
          className="rounded-full self-center"
          src={props.icon.src}
          alt={props.icon.alt}
          width={width}
          height={height}
        />
      </button>
    );
  } else {
    <button />;
  }
}