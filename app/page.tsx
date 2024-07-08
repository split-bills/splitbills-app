import BalanceCard from "@/components/home/BalanceCard";
import Transactions from "@/components/home/Transactions";

export default function Home() {
  return (
    <div className="p-4">
      <p className="text-3xl font-bold tracking-normal mt-8 mb-4">
        <span className="">Hello</span>, John Doe!
      </p>
      <div className="flex flex-row gap-20">
        <BalanceCard />
        <Transactions />
      </div>
    </div>
  );
}
