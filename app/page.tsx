import Desktop from "@/components/Desktop";
import Phone from "@/components/Phone";

export default function Home() {
  return (
    <>
      <div className="hidden md:block">
        <Desktop />
      </div>
      <div className="md:hidden">
        <Phone />
      </div>
    </>
  );
}
