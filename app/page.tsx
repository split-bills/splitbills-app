import BalanceCard from "@/components/home/BalanceCard";
import Transactions from "@/components/home/Transactions";

export default function Home() {
  return (
    <div className="p-4 bg-muted/40  min-h-screen">
      <p className="text-4xl font-bold tracking-normal ml-1 mt-8">
        <span className="">Hello</span>, John Doe!
      </p>
      <div className="flex flex-row">
        <BalanceCard />
        <Transactions />
      </div>
    </div>
  );
}
