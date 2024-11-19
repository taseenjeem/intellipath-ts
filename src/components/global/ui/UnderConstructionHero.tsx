import Image from "next/image";
import heroImg from "/public/assets/images/under-construction.svg";
import Link from "next/link";

interface IUnderConstructionProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
}

const UnderConstructionHero = ({
  title,
  description,
  buttonText,
  buttonHref,
}: IUnderConstructionProps) => {
  return (
    <>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src={heroImg}
            alt="Under construction hero img"
            className="max-w-xl rounded-lg drop-shadow-2xl"
          />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
            <p className="py-6">{description}</p>
            {buttonText && buttonHref && (
              <Link href={buttonHref} className="btn btn-primary">
                {buttonText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UnderConstructionHero;
