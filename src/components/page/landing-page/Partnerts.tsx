import Image from "next/image";
import Link from "next/link";

const companies = [
  {
    id: "1",
    image: "/assets/images/companies/google.svg",
    alt: "Google",
  },
  {
    id: "2",
    image: "/assets/images/companies/microsoft.svg",
    alt: "Microsoft",
  },
  {
    id: "3",
    image: "/assets/images/companies/ibm.svg",
    alt: "IBM",
  },
  {
    id: "4",
    image: "/assets/images/companies/meta.svg",
    alt: "Meta",
  },
  {
    id: "5",
    image: "/assets/images/companies/nvidia.svg",
    alt: "Nvidia",
  },
  {
    id: "6",
    image: "/assets/images/companies/airbnb.svg",
    alt: "Airbnb",
  },
];

const Partners = () => {
  return (
    <section className="w-full wrapper mt-7 md:mt-28">
      <div className="md:flex md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 className="lg:text-5xl text-3xl text-primary uppercase font-bold">
            Trusted by Leading Companies Worldwide
          </h2>

          <p className="mt-6">
            Join a community of learners and instructors from top global
            companies. Whether you&apos;re looking to enhance your skills or
            share your expertise, IntelliPath is the trusted platform to achieve
            your goals. Partner with us and see how our courses are making a
            difference across industries.
          </p>
        </div>
        <Link href="/shop" className="mt-6 md:mt-0 btn btn-primary ">
          Join Our Community
        </Link>
      </div>
      <div className="mt-7 md:mt-10 grid grid-cols-3 md:grid-cols-6 gap-8">
        {companies.map((item) => (
          <div key={item.id} className="flex justify-center items-center">
            <Image
              src={item.image}
              alt={item.alt}
              width={150}
              height={100}
              className="grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Partners;
