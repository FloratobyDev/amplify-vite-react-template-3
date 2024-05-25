import BrandLogo from "../logos/BrandLogo";

function Brand() {
  return (
    <div className="flex gap-x-2 items-center">
      <BrandLogo />
      <h1 className="font-poppins font-regular text-20 text-primary">Culture</h1>
    </div>
  );
}

export default Brand;
