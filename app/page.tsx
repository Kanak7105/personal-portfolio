import Desktop from "@/components/Desktop";
import MobileView from "@/components/MobileView";

export default function Home() {
  return (
    <>
      <div className="hidden md:block">
        <Desktop />
      </div>
      <div className="md:hidden">
        <MobileView />
      </div>
    </>
  );
}
